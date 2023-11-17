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

@app.route("/login")
def getLogin():
    print("Logging user {} ".format(str(request.args.get('email'))))
    if confirm_user_access(request.args):
        return jsonify({'message': 'ACCESS GRANTED!'}), 200
    else:
        return jsonify({'message': 'ACCESS DENIED!'}), 403

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part!'}), 400
    file = request.files['file']
    description = request.form.get('description')
    email = request.form.get('email')
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        if upload_file_to_s3(file,description,email):
        # process your description here
            return jsonify({'message': 'File uploaded to S3'}), 200
        else:
            return jsonify({'message': 'Failed to upload file to S3'}), 400
    else:
        return jsonify({'message': 'Unsupported file type'}), 400

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
    app.run(host='0.0.0.0',port=8080)
