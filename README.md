# Serverless Website for Photo Tagging with Amazon Rekognition
This is a demo website using Serverless architecture that allow you to upload photos from your camera/disk to an S3 bucket and trigger a backend processing that will extract tags from the photo, by using Amazon Rekognition service.

# Prerequisites

## AWS Account

In order to run this website you'll need an AWS Account with access to create AWS IAM, S3, CloudFront, DynamoDB, Lambda, API Gateway, Rekognition and Cognito resources.

Your account credentials should be added to your local environment. Run `aws configure` to configure your account.

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

## Config specific AWS settings and services

### config.js

Each time you deploy this app to AWS your AWS settings and services will be changed. You should manage those parameters in [/js/config.js](/js/config.js).

Please make sure you provide the next parameters before deploying you app:

```
AWS.config.region
AWSPoolID
apiURL
```

### serverless.yml

In addition to ```/js/js.config``` you will have to generate an SSL key using AWS Certificate Manager (ACM) and provide the resource name (ARN) in ```serverless.yml```. Search your ```serverless.yml``` for ```AcmCertificateArn``` and update to the ARN of your certificate.

To customize your application and make it yours, please update ```staticSiteName``` to the domain you would like to use for your app. This domain is needed to create your SSL certificate and CloudFront distribution.
You can manage your DNS record in Amazon Route53 but this is out of the scope of this project.

# Application Deploy

To deploy your application run

```
$ serverless deploy
```

This will create all needed services to run the demo app. The first deployment can take a lot of time (~30 min) due to CloudFormation distribution creation. After your deployment is done, you can access the app at ```https://[staticSiteName]```.
