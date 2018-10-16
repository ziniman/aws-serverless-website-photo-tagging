from __future__ import print_function

import boto3
import json
import logging
import os
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError

from datetime import datetime

logger = logging.getLogger()
logger.setLevel(logging.INFO)

region_name=os.environ['AWS_REGION']

dynamodb = boto3.resource('dynamodb', region_name)
photos_table = dynamodb.Table('reko-photo-tagging-demo-Photos')
tags_table = dynamodb.Table('reko-photo-tagging-demo-Tags')
photo_tags_table = dynamodb.Table('reko-photo-tagging-demo-PhotosTags')

def get_tags(event, context):
    logger.info('Received event: ' + json.dumps(event))

    tag = event['queryStringParameters']['tag']

    try:
	response = photo_tags_table.query(
        IndexName='TagOnly',
        ProjectionExpression="photo_id",
	    KeyConditionExpression=Key('tag_id').eq(tag)
    )

    except ClientError as e:
        logger.error(e.response['Error']['Message'])
        #return event
        raise SystemExit
    else:
        items = json.dumps(response[u'Items'])
        print (items)

        return {
            'statusCode': 200,
            'headers': { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            'body': items
        }
