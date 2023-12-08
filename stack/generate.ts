import { App } from "aws-cdk-lib";
import { ServiceStack } from "./stack";

// Generate the stack
const app = new App();
const stackName = `thorhj-lambda-apm-test-stack`;

const account = process.env.AWS_ACCOUNT;
const region = process.env.AWS_REGION;

new ServiceStack(app, stackName, {
  stackName,
  env: {
    account,
    region,
  },
});
