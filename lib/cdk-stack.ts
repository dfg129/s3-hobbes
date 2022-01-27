import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

export class S3HobbesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const inventoryBucket = new s3.Bucket(this, 'InventoryBucket');

    const dataBucket = new s3.Bucket(this, 'DataEventBucket', {
      encryption:s3.BucketEncryption.KMS,
      bucketKeyEnabled: true,
      enforceSSL: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      inventories: [
          {
          frequency: s3.InventoryFrequency.DAILY,
          includeObjectVersions: s3.InventoryObjectVersion.CURRENT,
          destination: {
            bucket: inventoryBucket,
          }
        },
      ],
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const policyResult = dataBucket.addToResourcePolicy(new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        principals:[new iam.AccountRootPrincipal()],
        actions: [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
        ],
        resources: [`${dataBucket.bucketArn}/*`],
    }));

   if (!policyResult.statementAdded) {
     console.log("Error condition:: dataBucket policy not added");
     return;
   }
  }
}
