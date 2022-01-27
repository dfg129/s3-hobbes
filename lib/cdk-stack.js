"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const iam = require("aws-cdk-lib/aws-iam");
class CdkStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const inventoryBucket = new s3.Bucket(this, 'InventoryBucket');
        const dataBucket = new s3.Bucket(this, 'DataDropEventBucket', {
            encryption: s3.BucketEncryption.KMS,
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
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });
        const policyResult = dataBucket.addToResourcePolicy(new iam.PolicyStatement({
            actions: [
                's3:Create*',
                's3:Describe*',
                's3:Enable*',
                's3:List*',
                's3:Put*',
            ],
            principals: [new iam.AccountRootPrincipal()],
            resources: ['*'],
        }));
        if (!policyResult.statementAdded) {
            return;
        }
    }
}
exports.CdkStack = CdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUErRDtBQUUvRCx5Q0FBeUM7QUFDekMsMkNBQTJDO0FBRTNDLE1BQWEsUUFBUyxTQUFRLG1CQUFLO0lBQ2pDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxlQUFlLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRS9ELE1BQU0sVUFBVSxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUU7WUFDNUQsVUFBVSxFQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO1lBQ2xDLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsVUFBVSxFQUFFLElBQUk7WUFDaEIsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFNBQVM7WUFDakQsV0FBVyxFQUFFO2dCQUNYO29CQUNFLFNBQVMsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsS0FBSztvQkFDdEMscUJBQXFCLEVBQUUsRUFBRSxDQUFDLHNCQUFzQixDQUFDLE9BQU87b0JBQ3hELFdBQVcsRUFBRTt3QkFDWCxNQUFNLEVBQUUsZUFBZTtxQkFDeEI7aUJBQ0Y7YUFDRjtZQUNELGFBQWEsRUFBRSwyQkFBYSxDQUFDLE9BQU87WUFDcEMsaUJBQWlCLEVBQUUsSUFBSTtTQUN4QixDQUFDLENBQUM7UUFFSCxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsbUJBQW1CLENBQUMsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDO1lBQ3hFLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLGNBQWM7Z0JBQ2QsWUFBWTtnQkFDWixVQUFVO2dCQUNWLFNBQVM7YUFDVjtZQUNELFVBQVUsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDO1NBQ25CLENBQUMsQ0FBQyxDQUFDO1FBRUwsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUU7WUFDaEMsT0FBTztTQUNSO0lBQ0YsQ0FBQztDQUNGO0FBeENELDRCQXdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzLCBSZW1vdmFsUG9saWN5IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuXG5leHBvcnQgY2xhc3MgQ2RrU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgaW52ZW50b3J5QnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCAnSW52ZW50b3J5QnVja2V0Jyk7XG5cbiAgICBjb25zdCBkYXRhQnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCAnRGF0YURyb3BFdmVudEJ1Y2tldCcsIHtcbiAgICAgIGVuY3J5cHRpb246czMuQnVja2V0RW5jcnlwdGlvbi5LTVMsXG4gICAgICBidWNrZXRLZXlFbmFibGVkOiB0cnVlLFxuICAgICAgZW5mb3JjZVNTTDogdHJ1ZSxcbiAgICAgIGJsb2NrUHVibGljQWNjZXNzOiBzMy5CbG9ja1B1YmxpY0FjY2Vzcy5CTE9DS19BTEwsXG4gICAgICBpbnZlbnRvcmllczogW1xuICAgICAgICB7XG4gICAgICAgICAgZnJlcXVlbmN5OiBzMy5JbnZlbnRvcnlGcmVxdWVuY3kuREFJTFksXG4gICAgICAgICAgaW5jbHVkZU9iamVjdFZlcnNpb25zOiBzMy5JbnZlbnRvcnlPYmplY3RWZXJzaW9uLkNVUlJFTlQsXG4gICAgICAgICAgZGVzdGluYXRpb246IHtcbiAgICAgICAgICAgIGJ1Y2tldDogaW52ZW50b3J5QnVja2V0LFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICBhdXRvRGVsZXRlT2JqZWN0czogdHJ1ZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHBvbGljeVJlc3VsdCA9IGRhdGFCdWNrZXQuYWRkVG9SZXNvdXJjZVBvbGljeShuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAgICAnczM6Q3JlYXRlKicsXG4gICAgICAgICAgJ3MzOkRlc2NyaWJlKicsXG4gICAgICAgICAgJ3MzOkVuYWJsZSonLFxuICAgICAgICAgICdzMzpMaXN0KicsXG4gICAgICAgICAgJ3MzOlB1dConLFxuICAgICAgICBdLFxuICAgICAgICBwcmluY2lwYWxzOiBbbmV3IGlhbS5BY2NvdW50Um9vdFByaW5jaXBhbCgpXSxcbiAgICAgICAgcmVzb3VyY2VzOiBbJyonXSxcbiAgICB9KSk7XG5cbiAgIGlmICghcG9saWN5UmVzdWx0LnN0YXRlbWVudEFkZGVkKSB7XG4gICAgIHJldHVybjtcbiAgIH1cbiAgfVxufVxuIl19