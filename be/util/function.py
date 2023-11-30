import boto3, botocore
import pymysql
from pymysql import *
from werkzeug.utils import secure_filename
from boto3 import *
from os import environ

AWS_BUCKET_NAME= 
AWS_ACCESS_KEY= 
AWS_SECRET_ACCESS_KEY= 
AWS_S3_REGION_NAME= 
AWS_DOMAIN= 
AWS_CLOUDFRONT_KEY_ID= 
AWS_CLOUDFRONT_KEY=
RDS_SCHEMA= 
RDS_FILE_INFO= 
RDS_USER_INFO= 
RDS_HOST= '
RDS_USERNAME= 
RDS_PASSWORD= 
RDS_DATABASE= 
RDS_PORT=
ADMIN = 
SCHEMA = RDS_SCHEMA
TABLE_FILE_INFO = RDS_FILE_INFO
TABLE_USER_INFO = RDS_USER_INFO
CF_URL = AWS_DOMAIN
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif','pdf'}


s3 = boto3.client(
    "s3",
    aws_access_key_id = AWS_ACCESS_KEY,
    aws_secret_access_key= AWS_SECRET_ACCESS_KEY
)

def upload_file_to_s3(file,file_desc,email):
    filename = secure_filename(file.filename)
    file_data = {}
    try:
        s3.upload_fileobj(file,AWS_BUCKET_NAME,filename)
    except Exception as e:
        message = "Error running query:{0} Generated error: {1}".format(filename,str(e))
        return False
    else:
        message = "Successfully uploaded {}".format(filename)
        file_data['file_name'] = filename
        file_data['file_desc'] = file_desc
        file_data['email'] = email
        if not save_file_name_to_rds(file_data):
            return False
    print(message)
    return True

def connect_mysql():
    db = pymysql.connect(host = RDS_HOST, user= RDS_USERNAME, password = RDS_PASSWORD, database = RDS_DATABASE)
    return db

def set_upsert_rds(query):
    #function to insert and update to RDS
    try:
        print('Initiating set_upsert_rds function')
        db = connect_mysql()
        cursor = db.cursor()
        cursor.execute(query)
    except Exception as e:
        message = "Error running query:{0} Generated error: {1}".format(query,str(e))
        return False
    else:
        db.commit()
        db.close()
        message = "Query: {0} ran successfully!".format(query)
    print(message)
    return True

def get_info_rds(query):
    #function to get info from RDS
    try:
        db = connect_mysql()
        print('Initiating get_info_rds function')
        data = {}
        cursor = db.cursor()
        cursor.execute(query)
        data = cursor.fetchall()
        print("data {}".format(str(data)))
    except Exception as e:
        message = "Error running query:{0} Generated error: {1}".format(query,str(e))
    else:
        db.close()
        message = "Query: {0} ran successfully!".format(query)
    print(message)
    return data

def save_file_name_to_rds(data):
    #functions to save filename to rds
    file_name = data.get('file_name')
    file_description = data.get('file_desc')
    email = data.get('email')
    query = ("INSERT INTO {0}.{1} (file_name, file_desc,email,status,file_uploaded_timestamp,last_updated_timestamp)\
            VALUES ('{2}','{3}','{4}','INSERT', NOW(),NOW());"
             .format(SCHEMA,TABLE_FILE_INFO,file_name,file_description, email))
    return set_upsert_rds(query)

def get_file_names_rds(email):
    #functions to retrieve filenames
    if email  == ADMIN:
        query = ("select id,file_name,file_desc,CONCAT('https:{0}/' ,file_name, '/')  as url,email,status,file_uploaded_timestamp,last_updated_timestamp from {1}.{2} \
        ".format(CF_URL,SCHEMA,TABLE_FILE_INFO)) 
    else:
        query = ("select id,file_name,file_desc,status,CONCAT('https:{0}/' ,file_name, '/')  as url ,file_uploaded_timestamp,last_updated_timestamp from {1}.{2} \
        where email = '{3}' and status in ('INSERT','MODIFIED')".format(CF_URL,SCHEMA,TABLE_FILE_INFO,email))
    data =  get_info_rds(query)
    return data

def get_user_details_rds(email):
    #functions to retrieve userdetails
    if email == ADMIN:
        query = ("""SELECT CONCAT(t1.firstname,' ',t1.lastname) as user, 
                       COUNT(IF(t2.status IN ('INSERT','MODIFIED'), 1, NULL)) as total_files_uploaded,
                       COUNT(IF(t2.status IN ('DELETE','ADMIN-DELETED'), 1, NULL)) as total_files_deleted,
                       t1.email,
                       t1.last_updated_timestamp
                FROM {0}.{1} t1
                LEFT JOIN {0}.{2} t2 ON t1.email = t2.email where t1.email != '{3}'
                GROUP BY t1.email;
                """).format(SCHEMA,TABLE_USER_INFO,TABLE_FILE_INFO,ADMIN)
        return get_info_rds(query)
    else:
        print("ACCESS DENIED!")
        return {}
    
def get_file_stats(email):
    query = """ SELECT 'DELETED' as status, COUNT(1) as count FROM {0}.{1} WHERE status IN ('DELETE','ADMIN-DELETE')
                UNION ALL
                SELECT 'INSERTED', COUNT(1) FROM {0}.{1} WHERE status = 'INSERT' 
                UNION ALL
                SELECT 'UPDATED', COUNT(1) FROM {0}.{1} WHERE status = 'MODIFIED';""".format(SCHEMA,TABLE_FILE_INFO)
    data = get_info_rds(query)
    print(data)
    return data[1][1],data[0][1],data[2][1]

def delete_file_name_rds(file_name,email):
    #set filename to delete
    print('Initiating delete_file_name_rds')
    status = 'DELETE'
    query = ("update {0}.{1} set status= '{2}', last_updated_timestamp = NOW() \
    where email = '{3}' and file_name = '{4}'".format(SCHEMA,TABLE_FILE_INFO,status,email,file_name))
    return set_upsert_rds(query)

def delete_file_name_rds_admin(file_name,email):
    #set filename to delete
    print('Initiating delete_file_name_rds_admin')
    status = 'ADMIN-DELETE'
    query = ("update {0}.{1} set status= '{2}', last_updated_timestamp = NOW() \
    where email = '{3}' and file_name = '{4}'".format(SCHEMA,TABLE_FILE_INFO,status,email,file_name))
    return set_upsert_rds(query)

def terminate_user_rds(email):
    #set filename to delete
    print('Initiating terminate_user_rds')
    query = ("delete from {0}.{1} where email = '{2}'".format(SCHEMA,TABLE_USER_INFO,email))
    return set_upsert_rds(query)

def set_user_account(user_data):
    #CREATE USER ACCOUNT
    firstname = user_data.get('firstname')
    lastname  = user_data.get('lastname')
    email     = user_data.get('email').lower()
    password  = user_data.get('password')
    query     = ("INSERT INTO {0}.{1} (firstname,lastname,email, password,last_updated_timestamp)\
            VALUES ('{2}','{3}','{4}','{5}', NOW());"
             .format(SCHEMA,TABLE_USER_INFO,firstname,lastname,email,password))
    return set_upsert_rds(query)

def confirm_user_access(user_data):
    #get user info
    email = user_data.get('email')    
    query = ("select password from {0}.{1} \
    where email = '{2}'".format(SCHEMA,TABLE_USER_INFO,email))
    if user_data.get('password') == get_info_rds(query)[0][0]:
        return True
    else:
        return False

def delete_file_s3(file_name,email):
    #delete files
    try:
        print("Initiating delete_file_s3!")
        s3.delete_object(
            Bucket = AWS_BUCKET_NAME,
            Key = file_name
        )
    except Exception as e:
        message = "Failed to delete {} file with error {}".format(file_name,str(e))
        return False
    else:
        message = 'Successfully deleted file'
    print(message)
    return True

def modify_file_rds(file_name,file_desc,email):
    #set filename to update
    print('Initiating delete_file_name_rds')
    query = ("update {0}.{1} set status='MODIFIED', file_desc = '{4}', last_updated_timestamp = NOW() \
    where email = '{2}' and file_name = '{3}'".format(SCHEMA,TABLE_FILE_INFO,email,file_name,file_desc))
    return set_upsert_rds(query)

def modify_file_s3(file,file_name,file_desc,email):
    #delete files
    try:
        #put apporach
        # s3.put_object(Body=file, 
        #               Bucket=AWS_BUCKET_NAME, 
        #               Key=file_name)
        #removing existing file
        print("Initiating modify_file_s3 - removing existing file!")
        print("Deleting file!")
        s3.delete_object(
            Bucket = AWS_BUCKET_NAME,
            Key = file_name
        )
        #replace with new file
        print("Uploading file!")
        s3.upload_fileobj(
            file,
            AWS_BUCKET_NAME,
            file_name
        )
    except Exception as e:
        message = "Failed to modify {} file with error {}".format(file_name,str(e))
        print(message)
        return False
    else:
        message = 'Successfully modified file'
        if not modify_file_rds(file_name,file_desc,email):
            return False
    print(message)
    return True

def allowed_file(filename):
    #return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    return True