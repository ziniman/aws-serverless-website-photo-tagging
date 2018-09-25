from __future__ import print_function

import boto3
import json
import logging
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError

from datetime import datetime

logger = logging.getLogger()
logger.setLevel(logging.INFO)

region_name=os.environ['AWS_REGION']

dynamodb = boto3.resource('dynamodb', region_name)
photos_table = dynamodb.Table('reko-photo-tagging-demo-Photos')
tags_table = dynamodb.Table('reko-photo-tagging-demo-Tags')

def get_tags(event, context):
    logger.info('Received event: ' + json.dumps(event))

    try:
	response = tags_table.query(
    	ScanIndexForward=False,
	    Limit=1,
	    KeyConditionExpression=Key('tag').eq(lookupSN)
    )

    except ClientError as e:
        logger.error(e.response['Error']['Message'])
        #return event
        raise SystemExit
    else:
        item = response[u'Items']
        item = json.dumps(item[0])
        logger.info(item)

        return {
            'statusCode': 200,
            'headers': { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            'body': item
        }
