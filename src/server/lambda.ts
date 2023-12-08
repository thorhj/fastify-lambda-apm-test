import awsLambdaFastify from "@fastify/aws-lambda";
import { build } from "../app";

// Handler used in the Lambda deployed by the stack
const app = build();
const handler = awsLambdaFastify(app);
export { handler };
