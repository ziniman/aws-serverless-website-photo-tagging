# Serverless Website for Photo Tagging with Amazon Rekognition
This is a demo website using Serverless architecture that allow you to upload photos from your camera to an S3 bucket and trigger a backend processing that will extract tags from the photo, by using Amazon Rekognition service.

# Prerequisites

## AWS Account

In order to run this website you'll need an AWS Account with access to create AWS IAM, S3, DynamoDB, Lambda, API Gateway, Rekognition and Cognito resources.

## Serverless framework

This demo is using the [Serverless Framework](https://serverless.com/) for application management and deployment.
Please refer to the [Quick Start](https://serverless.com/framework/docs/providers/aws/guide/quick-start/) page for installation details.

## Serverless S3 Sync [![npm](https://img.shields.io/npm/v/serverless-s3-sync.svg)](https://www.npmjs.com/package/serverless-s3-sync)

This is a plugin to sync local directories and S3 prefixes for Serverless Framework. In this demo it is being used for syncing the static website code (under [/static-site](static-site)) to S3.

### Install

Run `npm install` in your Serverless project.

```sh
$ npm install --save serverless-s3-sync
```
