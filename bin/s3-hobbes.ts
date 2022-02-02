#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { S3HobbesStack } from '../lib/s3-hobbes';

const app = new cdk.App();
new S3HobbesStack(app, 's3-hobbes', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
