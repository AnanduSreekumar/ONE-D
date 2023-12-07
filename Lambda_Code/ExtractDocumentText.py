import json
import boto3

def lambda_handler(event, context):
    print(event)
    object_key = event.get('file_name', None)

    textract_client = boto3.client('textract')

    # Call the analyze_document API
    response = textract_client.analyze_id(
        DocumentPages=[{'S3Object': {'Bucket': 'one-id-resource', 'Name': object_key}}]
    )
    dic = {}

    # Extract the text from the response
    extracted_text = ''
    for doc_fields in response['IdentityDocuments']:
        for id_field in doc_fields['IdentityDocumentFields']:
            for key, val in id_field.items():
                if "Type" in str(key):
                    x = val['Text']
            for key, val in id_field.items():
                if "ValueDetection" in str(key):
                    dic[x] = val['Text']

    # Convert data to JSON string
    json_data = json.dumps(dic)

    return  json_data
