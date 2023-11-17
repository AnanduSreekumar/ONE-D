import os
from util.function import *
from flask_cors import CORS
from os import environ
from flask import Flask, request, jsonify,render_template, request, redirect, url_for


app = Flask(__name__)

app.config['MYSQL_DATABASE_USER'] = environ.get('MYSQL_DATABASE_USER')
app.config['MYSQL_DATABASE_PASSWORD'] = environ.get('MYSQL_DATABASE_PASSWORD')
app.config['MYSQL_DATABASE_DB'] = environ.get('MYSQL_DATABASE_DB')
app.config['MYSQL_DATABASE_HOST'] = environ.get('MYSQL_DATABASE_HOST')

CORS(app)


@app.route("/create_account", methods=['POST'])
def create_account():
    data = request.json 
    print(str(data))
    set_user_account(data)
    return 'ACCESS GRANTED!',200

@app.route("/login")
def getLogin():
    print("Logging user {} ".format(str(request.args.get('email'))))
    if confirm_user_access(request.args):
        return 'ACCESS GRANTED!',200
    else:
        return 'ACCESS DENIED!',403

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    description = request.form.get('description')
    email = request.form.get('email')
    if file.filename == '':
        return 'No selected file', 400
    if file and allowed_file(file.filename):
        upload_file_to_s3(file,description,email)
        # process your description here
        return 'File uploaded to S3', 200
    else:
        return 'Unsupported file type', 400

#list
@app.route("/filemanager", methods=['POST'])
def list_files():
    email = request.form.get('email')
    data =  get_file_names_rds(email)
    print(jsonify({'data': data}))
    return jsonify({'data': data})

#list users
@app.route("/listusers")
def list_users():
    data =  get_user_details_rds()
    return jsonify({'data': data})

@app.route('/deletefileS3/<email>/<filename>', methods=['DELETE'])
def delete_file(email,filename):
    response =  delete_file_s3(filename,email)
    return {'result': response}

if __name__ == "__main__":
    app.run(debug=True)