#Developer : Anandu Sreekumar
#
#
from util.function import *
from flask_cors import CORS
from flask import Flask, request, jsonify, request


app = Flask(__name__)

CORS(app)


@app.route("/create_account", methods=['POST'])
def create_account(): 
    if set_user_account(request.json):
        print("ACCOUNT CREATED!")
        return jsonify({'message': 'ACOOUNT CREATED!'}), 200
    else:
        return jsonify({'message': 'ACCOUNT CREATION FAILED!'}), 400

@app.route("/cred_cognito", methods=['POST'])
def cred_cognito():
    data = cred_cognito_fn()
    return jsonify({ 'data': data,'message': 'credentials requested'}), 200

@app.route("/test_api_connection", methods=['POST'])
def test_api_connection():
    return jsonify({ 'data': request.json,'message': 'tetsing in progress!'}), 200

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part!'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        if upload_file_to_s3(file,request.form):
            email = request.form.get('email')
            one_id = get_one_id(email)
            file_name = secure_filename(str(one_id)+'_'+request.form.get('doc_type')+'.'+file.filename.rsplit('.', 1)[1].lower())
            data = run_textract(file_name)
            update_user_status(request.form,'upload')
        # process your description here
            return jsonify({'data':data,'message': 'File uploaded to S3'}), 200
        else:
            return jsonify({'message': 'Failed to upload file to S3'}), 400
    else:
        return jsonify({'message': 'Unsupported file type'}), 400

@app.route("/set_textract_data", methods=['POST'])
def upload_extracted_data():
    if set_textract_data(request.json):
        print("DATA UPDATED!")
        update_user_status(request.json,'data_updated')
        return jsonify({'message': 'DATA UPDATED!'}), 200
    else:
        return jsonify({'message': 'DATA FAILED!'}), 400

@app.route("/get_otp", methods=['POST'])
def get_otp():
    data = get_otp_rds(request.json)
    return jsonify({'data':data,'message': 'retreieveing OTP'}), 200

@app.route("/get_check_in_logs", methods=['POST'])
def get_check_in_logs():
    #email, role
    data = get_check_in_logs_rds(request.json)
    return jsonify({'data':data,'message': 'retreieveing OTP'}), 200

@app.route("/raise_dispute_user", methods=['POST'])
def raise_dispute():
    #input check_in_id,dispute_comments
    if raise_dispute_rds(request.json):
        return jsonify({'message': 'DISPUTE RAISED!'}), 200
    else:
        return jsonify({'message': 'FAILED TO UPDATE!'}), 400

#list
@app.route("/extract_user_data", methods=['POST'])
def extract_user_data():
    data = get_user_extracted_data_rds(request.json)
    result_json = { 'data': data}
    #check expiry pending document_expiry_date
    return jsonify(result_json),200

@app.route("/login", methods=['POST'])
def getLogin():
    #get_user_status_role_rds
    print("Logging user {} ".format(str(request.json)))
    data = get_user_status_role_rds(request.json)
    return jsonify({'data':data,'message': 'ACCESS GRANTED!'}), 200

@app.route("/login_one_id", methods=['POST'])
def getLoginOneD():
    print("Logging user with one_id {} ".format(str(request.json.get('one_id'))))
    #confirming the user details with OTP
    if confirm_user_one_id(request.json):
        #fetching user data
        data = get_user_extracted_data_rds(request.json)
        #reset otp
        reset_one_id_otp(request.json)
        #log entry for user knowledge
        log_entry_one_id_usage(request.json)
        return jsonify({'data':data,'message': 'ACCESS GRANTED!'}), 200
    else:
        return jsonify({'message': 'ACCESS DENIED!'}), 403

@app.route("/get_notary_service", methods=['POST'])
def get_notary_service():
    #get notary address
    data = get_notary_service_rds(request.json)
    result_json = { 'data': data}
    return jsonify(result_json),200

@app.route("/get_admin_stats", methods=['POST'])
def get_admin_stats():
    #get notary address
    data = get_admin_stats_rds(request.json)
    result_json = { 'data': data}
    return jsonify(result_json),200

@app.route("/get_verification_info", methods=['POST'])
def get_verification_info():
    #get notary address
    data = get_verification_info_rds(request.json)
    result_json = { 'data': data}
    return jsonify(result_json),200

@app.route("/set_verification", methods=['POST'])
def set_user_verification():
    #get user account verification
    if set_user_verification_rds(request.json):
        print("ACCOUNT VERIFICATION UPDATED!")
        if request.json.get('verification_status',False):
            status = 'verified'
        else:
            status = 'verification_failed'
        update_user_status(request.json,status)
        return jsonify({'message': 'ACCOUNT VERIFIED UPDATED!'}), 200
    else:
        return jsonify({'message': 'ACCOUNT VERIFIED UPDATE FAILED!'}), 400

#list
@app.route("/filemanager", methods=['POST'])
def list_files():
    email = request.json.get('email')
    print(email)
    data = get_file_names_rds(email)
    result_json = { 'data': data}
    #get inserted file count deleted file count and 
    if email == ADMIN:
        total_files = len(data)
        total_insert,total_deleted,total_modified = get_file_stats(email)
        result_json.update({'file_count':total_files,'file_insert':total_insert,'file_deleted':total_deleted,'file_modified':total_modified})
    return jsonify(result_json),200

#list users
@app.route("/listusers", methods=['POST'])
def list_users():
    data =  get_user_details_rds(request.json.get('email'))
    total_users = len(data)
    return jsonify({'data': data,'total_users':total_users}),200

@app.route('/deletefileS3/<email>/<filename>', methods=['DELETE'])
def delete_file(email,filename):
    if delete_file_s3(filename,email):
        delete_file_name_rds(filename,email)
        return jsonify({'message': 'File deleted'}), 200
    else:
        return jsonify({'message': 'Failed to delete file'}), 400
    
@app.route('/deletefileS3Admin/<email>/<filename>', methods=['DELETE'])
def delete_file_admin(email,filename):
    if delete_file_s3(filename,email):
        delete_file_name_rds_admin(filename,email)
        return jsonify({'message': 'File deleted'}), 200
    else:
        return jsonify({'message': 'Failed to delete file'}), 400

@app.route('/deleteUser/<email>', methods=['DELETE'])
def terminate_user_account(email):
    if terminate_user_rds(email):
        return jsonify({'message': 'User account terminated'}), 200
    else:
        return jsonify({'message': 'Failed to terminate user'}), 400

@app.route('/modifyfileS3/', methods=['POST'])
def modify_file():
    print(request)
    filename = request.form.get('filename')
    file_desc = request.form.get('description')
    email = request.form.get('email')
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    file = request.files['file']
    if modify_file_s3(file,filename,file_desc,email):
        # process your description here
        return jsonify({'message': 'File modified in S3'}), 200
    else:
        return jsonify({'message': 'Failed to modify the file'}), 400


@app.route("/")
def test():
    return "<h1>Test one-d connection successful</h1>"


if __name__ == "__main__":
    print('Starting one-d server!')
    app.run(host='0.0.0.0',port=5000)
