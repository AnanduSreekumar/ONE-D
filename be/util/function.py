import boto3, botocore
import pymysql
import random
from pymysql import *
from werkzeug.utils import secure_filename
from boto3 import *
from os import environ
import json


s3 = boto3.client(
    "s3",
    aws_access_key_id = AWS_ACCESS_KEY,
    aws_secret_access_key= AWS_SECRET_ACCESS_KEY
)

def cred_cognito_fn():
    return {'USER_POOL':COGNITO_USER_POOL_ID,'CLIENT_ID':COGNITO_CLIENT_ID}

def upload_file_to_s3(file,file_data):
    email = file_data.get('email')
    one_id = get_one_id(email)
    file_name = secure_filename(str(one_id)+'_'+file_data.get('doc_type')+'.'+file.filename.rsplit('.', 1)[1].lower())
    print(file_name)
    try:
        s3.upload_fileobj(file,AWS_BUCKET_NAME,file_name)
    except Exception as e:
        message = "Error running query:{0} Generated error: {1}".format(file_name,str(e))
        print(message)
        return False
    else:
        message = "Successfully uploaded {}".format(file_name)
        print(message)
        if not save_file_name_to_rds(file_data):
            return False
    return True

def run_textract(file_name):
    input_data = {'file_name':file_name}
    response = boto3.client('lambda',
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name= AWS_S3_REGION_NAME
    ).invoke(
        FunctionName= LAMBDA_TEXTRACT,
        InvocationType='RequestResponse',
        Payload=json.dumps(input_data),
    )
    return json.loads(response['Payload'].read().decode("utf-8"))

def get_admin_stats_rds(user_data):
    data = {}
    if user_data.get('role') == 'admin':
        query = """ SELECT 'USERS' as role, COUNT(1) as count FROM {0}.{1} WHERE role = 'user' 
                UNION ALL
                SELECT 'DISPUTES', COUNT(1) FROM {0}.{2} WHERE dispute = True
                UNION ALL
                SELECT 'NOTARY', COUNT(1) FROM {0}.{1} WHERE role = 'notary' 
                UNION ALL
                SELECT 'CHECKER', COUNT(1) FROM {0}.{1} WHERE role = 'checker';""".format(SCHEMA,TABLE_USER_INFO,TABLE_CHECK_IN_LOGS)
        data = get_info_rds(query)
        print(data)
        data =  {'total_users':data[0][1],
                'total_disputes':data[1][1],
                'total_notary':data[2][1],
                'total_checker':data[3][1]}
    return data

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
        print(message)
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

def get_one_id(email):
    query = ("select one_id from {0}.{1} where email = '{2}' ".format(SCHEMA,TABLE_USER_INFO,email))
    return get_info_rds(query)[0][0]

def save_file_name_to_rds(file_data):
    #functions to save documents to rds
    doc_type = file_data.get('doc_type')
    doc_country = file_data.get('doc_country')
    doc_state = file_data.get('doc_state')
    one_id = get_one_id(file_data.get('email'))
    query = ("INSERT INTO {0}.{1} (one_id, doc_type, doc_country, doc_state, doc_uploaded_timestamp) \
            VALUES ({2},'{3}','{4}','{5}',NOW());"
             .format(SCHEMA,TABLE_DOC_INFO,one_id,doc_type,doc_country,doc_state))
    return set_upsert_rds(query)

def set_textract_data(data):
    #functions to save extracted data to rds
    one_id = get_one_id(data.get('email'))
    firstname = data.get('firstname')
    middlename = data.get('middlename','')
    lastname = data.get('lastname')
    age = data.get('age', 0)
    sex = data.get('sex','NA')
    address = data.get('address','NA')
    country = data.get('country','NA')
    county = data.get('county','NA')
    state = data.get('state','NA')
    pincode = data.get('pincode',00000)
    driving_license = data.get('driving_license','NA')
    occupation = data.get('occupation','NA')
    blood_type = data.get('blood_type','NA')
    document_expiry_date = str(data.get('document_expiry_date','1996-01-01'))
    doc_number = data.get('doc_number')
    doc_type = data.get('doc_type')
    text_json = data.get('text')
    query_in = ("INSERT INTO {0}.{1} (one_id, firstname,middlename,lastname,age,sex,address,country,county,state,pincode,driving_license,blood_type,occupation, document_expiry_date ,last_updated_timestamp) \
            VALUES ({2},'{3}','{4}','{5}',{6},'{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}',NOW());"
             .format(SCHEMA,TABLE_TEXT_EXTRACT_INFO,one_id, firstname,middlename,lastname,age,sex,address,country,county,state,pincode,driving_license,blood_type,occupation, document_expiry_date))
    data_response = set_upsert_rds(query_in)
    if data_response:
        query_up = ("""update {0}.{1} set doc_number = '{3}' where one_id = {2} and doc_type = '{4}'""".format(SCHEMA,TABLE_DOC_INFO,one_id,doc_number,doc_type))
        data_response = set_upsert_rds(query_up)
    return data_response


def get_user_extracted_data_rds(data):
    #functions to retrieve get_user_extracted_data from  rds
    email = data.get('email',None)
    one_id = data.get('one_id',None)
    if one_id is not None:
        print('searching with one_id')
        query = ("select * from {0}.{1} where one_id = {2} ".format(SCHEMA,TABLE_TEXT_EXTRACT_INFO,str(one_id))) 
    else:
        print('searching with email')
        query = ("select {1}.* from {0}.{1} join {0}.{2} on {1}.one_id = {2}.one_id where  {2}.email = '{3}' ".format(SCHEMA,TABLE_TEXT_EXTRACT_INFO,TABLE_USER_INFO,email))
    return get_info_rds(query)

def get_user_status_role_rds(data):
    #functions to retrieve user status and role based on  email/one_id from  rds
    email = data.get('email',None)
    one_id = data.get('one_id',None)
    if email is not None:
        print('fetching info with email')
        query = ("select status,role,country,state from {0}.{1} where email = '{2}' ".format(SCHEMA,TABLE_USER_INFO,email)) 
    else:
        print('fetching info with one_id')
        query = ("select status,role,country,state from {0}.{1} where one_id = {2}".format(SCHEMA,TABLE_USER_INFO,str(one_id))) 
    return get_info_rds(query)

def confirm_user_one_id(user_data):
    #confirm user one_id
    one_id = user_data.get('one_id')    
    query = ("select generated_otp  from {0}.{1} \
    where one_id = {2}".format(SCHEMA,TABLE_USER_INFO,one_id))
    if int(user_data.get('otp')) == int(get_info_rds(query)[0][0]):
        return True
    else:
        return False

def set_user_account(user_data):
    #CREATE USER ACCOUNT
    firstname = user_data.get('firstname')
    middlename  = user_data.get('middlename','')
    lastname  = user_data.get('lastname')
    country  = user_data.get('country')
    state  = user_data.get('state')
    role = user_data.get('role','user').lower()
    email     = user_data.get('email').lower()
    otp = generate_otp()
    query     = ("INSERT INTO {0}.{1} (firstname,middlename,lastname,email,role,country,state,generated_otp,status,last_updated_timestamp ,profile_created_date)\
            VALUES ('{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','created', NOW(), NOW());"
             .format(SCHEMA,TABLE_USER_INFO,firstname,middlename,lastname,email,role,country,state,otp))
    return set_upsert_rds(query)

def get_verification_info_rds(user_data):
    one_id = get_one_id(user_data.get('email'))
    query = ("select * from {0}.{1} where one_id = {2}".format(SCHEMA,TABLE_VERIFICATION_INFO,one_id))
    return get_info_rds(query)

def notify_user_otp(user_data):
    #pending
    print("Sending notification on OTP")

def generate_otp():
    #OTP GENERATOR
    return random.randint(10000, 99999)

def reset_one_id_otp(user_data):
    #reset otp
    otp = generate_otp()
    one_id = user_data.get('one_id')  
    query = ("update {0}.{1} set generated_otp = {2}, last_updated_timestamp = NOW() \
    where one_id = {3}".format(SCHEMA,TABLE_USER_INFO,otp,one_id))
    notify_user_otp(user_data)
    return set_upsert_rds(query)

def log_entry_one_id_usage(user_data):
    email_checker_notary = user_data.get('email')
    role = user_data.get('role','checker')
    one_id = user_data.get('one_id')  
    query     = ("INSERT INTO {0}.{1} (check_in_email,role,one_id,dispute,check_in_timestamp)\
            VALUES ('{2}','{3}','{4}','False', NOW());"
            .format(SCHEMA,TABLE_CHECK_IN_LOGS,email_checker_notary,role,one_id))
    return set_upsert_rds(query)

def update_user_status(user_data,status):
    #update_user_status
    email = user_data.get('email',None) 
    one_id = user_data.get('one_id',None)
    if one_id is not None:
        where_condition = " one_id = {}".format(one_id)
    else:
        where_condition = " email = '{}'".format(email)
    query = ("update {0}.{1} set status = '{2}', last_updated_timestamp = NOW() where {3}".format(SCHEMA,TABLE_USER_INFO,status,where_condition))
    return set_upsert_rds(query)


def get_notary_service_rds(user_data):
    #confirm user one_id
    country = user_data.get('country')
    state = user_data.get('state')
    pincode = user_data.get('pincode')
    query = """SELECT 
                CONCAT_WS(' ', {1}.firstname, {1}.middlename, {1}.lastname) AS notary_name,
                {2}.email,
                CONCAT_WS(', ', {1}.address, {1}.county, {1}.state, {1}.country, {1}.pincode) AS full_address
                FROM 
                    {0}.{1}
                JOIN 
                    {0}.{2} ON {1}.one_id = {2}.one_id
                WHERE 
                    {2}.role = 'notary' AND
                    {1}.country = '{3}' AND
                    {1}.state = '{4}'
                ORDER BY 
                    {1}.country ASC, 
                    {1}.state ASC, 
                    {1}.pincode ASC;
                """.format(SCHEMA,TABLE_TEXT_EXTRACT_INFO,TABLE_USER_INFO,country,state)
    return get_info_rds(query)

def set_user_verification_rds(verification_data):
    #verifiy user account
    one_id = verification_data.get('one_id')
    veri_status = verification_data.get('veri_status')
    veri_comments = verification_data.get('veri_comments')
    verifier_email = verification_data.get('verifier_email')
    country = verification_data.get('country')
    state = verification_data.get('state')
    query_insert  = ("INSERT INTO {0}.{1} (one_id, veri_status, veri_comments, verifier_email, country, state, updated_timestamp)\
            VALUES ('{2}','{3}','{4}','{5}','{6}','{7}', NOW());"
             .format(SCHEMA,TABLE_VERIFICATION_INFO,one_id,veri_status,veri_comments, verifier_email, country, state))
    query_update = ("""UPDATE {0}.{1} SET veri_id = (SELECT veri_id FROM {0}.{2}
                      WHERE one_id = {3}
                      AND verifier_email = '{4}'
                      AND country = '{5}'
                      AND state = '{6}')
                WHERE one_id = {3};
                """.format(SCHEMA,TABLE_DOC_INFO,TABLE_VERIFICATION_INFO,one_id,verifier_email,country,state))
    if set_upsert_rds(query_insert):
        return set_upsert_rds(query_update)
    else:
        return False
    
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

def get_otp_rds(user_data):
    email = user_data.get('email')
    query = "select one_id,generated_otp from {0}.{1} where email = '{2}'".format(SCHEMA,TABLE_USER_INFO,email)
    return get_info_rds(query)

def get_check_in_logs_rds(user_data):
    if user_data.get('role') != 'admin':
        one_id = get_one_id(user_data.get('email'))
        where_condition = "where one_id = {}".format(one_id)
    else:
        where_condition =  "where dispute = True order by check_in_email,dispute_timestamp desc"    
    query = "select * from {0}.{1} {2}".format(SCHEMA,TABLE_CHECK_IN_LOGS,where_condition)
    return get_info_rds(query)

def raise_dispute_rds(user_data):
    check_in_id = user_data.get('check_in_id')
    dispute_comments = user_data.get('dispute_comments')
    query = ("update {0}.{1} set dispute_comments= '{2}',dispute = True,dispute_timestamp = NOW() \
    where check_in_id = {3}".format(SCHEMA,TABLE_CHECK_IN_LOGS,dispute_comments,check_in_id))
    return set_upsert_rds(query)

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