from __future__ import print_function

import boto3
import json
import logging
import os
import urllib
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError

from datetime import datetime
from dateutil import tz

from_zone = tz.gettz('UTC')
to_zone = tz.gettz('Asia/Jerusalem')

logger = logging.getLogger()
logger.setLevel(logging.INFO)

region_name=os.environ['AWS_REGION']

dynamodb = boto3.resource('dynamodb', region_name)
photos_table = dynamodb.Table('reko-photo-tagging-demo-Photos')
tags_table = dynamodb.Table('reko-photo-tagging-demo-Tags')
photo_tags_table = dynamodb.Table('reko-photo-tagging-demo-PhotosTags')

rekognition = boto3.client("rekognition", region_name)

def write_image_meta(file_object, bucket_object, event_time):
    response = photos_table.put_item(
        Item={
            'photo_id': file_object['key'],
            'upload_date': event_time,
            'bucket': bucket_object['name'],
            }
    )

def write_image_tags(file_object, bucket_object, labels):
    for x in labels["Labels"]:
        response = tags_table.put_item(
            Item={
                'tag': x['Name'],
            }
        )
        response = photo_tags_table.put_item(
            Item={
                'photo_id': file_object['key'],
                'tag_id': x['Name'],
                'confidence': int(x['Confidence'])
            }
        )


def detect_labels(key, bucket, max_labels=10, min_confidence=80):
    logger.info(key)
    logger.info(bucket)
    response = rekognition.detect_labels(
        Image={
            "S3Object": {
            "Bucket": bucket,
                "Name": key,
            }
        },
        MaxLabels=max_labels,
        MinConfidence=min_confidence,
    )

    return response

def run_reko(event, context):
    logger.info('Event Data: ' + json.dumps(event))

    for key, value in os.environ.items():
        logger.info('Env var [' + key + ']: ' + value)

    file_object = event['Records'][0]['s3']['object']
    file_key = urllib.unquote_plus(file_object['key'].encode("utf8"))
    bucket_object = event['Records'][0]['s3']['bucket']
    event_time = event['Records'][0]['eventTime']

    write_image_meta(file_object, bucket_object, event_time)

    labels = detect_labels(file_key, bucket_object['name'])
    logger.info('Reko Labels: ' + json.dumps(labels))

    write_image_tags(file_object, bucket_object, labels)
