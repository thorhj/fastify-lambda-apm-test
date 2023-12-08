import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import path from "path";

export class ServiceStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const lambdaName = "thorhj-lambda-apm-test";

    new NodejsFunction(this, lambdaName, {
      functionName: lambdaName,
      runtime: Runtime.NODEJS_20_X,
      entry: path.join(__dirname, "../src/server/lambda.ts"),
      handler: "handler",
      memorySize: 512,
      timeout: Duration.seconds(30),
      bundling: {
        sourceMap: true,
        minify: false,
        forceDockerBundling: false,
      },
      environment: {
        ELASTIC_APM_ENVIRONMENT: "development",
        ELASTIC_APM_LOG_LEVEL: "warning",
        ELASTIC_APM_SEND_STRATEGY: "background",
        ELASTIC_APM_SERVICE_NAME: "thorhj-lambda-apm-test",
      },
    });
  }
}
