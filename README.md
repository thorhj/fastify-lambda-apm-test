# Fastify Lambda APM test function

This is a test API used to demonstrate [issue 3756](https://github.com/elastic/apm-agent-nodejs/issues/3756) on the Elastic APM agent for NodeJS.

What follows is a step-by-step guide on how to deploy the function code through AWS Console. For this you only need the compiled JS file `lambda/index.js` and this `README.md`, however the entire project is supplied as well for reference.

## 1. Create AWS Lambda Function

1. Go to Lambda and Press "Create Function"
2. Pick "Author from scratch"
3. Enter a function name, e.g. "thorhj-lambda-apm-test"
4. Pick runtime "Node.js 20.x"
5. Pick architecture "x86_64"
6. Press "Create function"

## 2. Change the function code

1. Go to the Code tab
2. Open "index.mjs"
3. Copy the contents of `/lambda/index.js` in this project to the function file `index.mjs`
4. Rename `index.mjs` to `index.js`
5. Press "Deploy" to update the function code

## 3. Add Elastic APM

Add the two Elastic APM layers to the Lambda using this guide: https://www.elastic.co/guide/en/apm/agent/nodejs/current/lambda.html


Add the following environment variables to the Lambda function:

```
NODE_OPTIONS: -r elastic-apm-node/start
ELASTIC_APM_ENVIRONMENT: development
ELASTIC_APM_LOG_LEVEL: warning
ELASTIC_APM_SEND_STRATEGY: background
ELASTIC_APM_SERVICE_NAME: thorhj-lambda-apm-test

ELASTIC_APM_LAMBDA_APM_SERVER: <your apm server url>
ELASTIC_APM_SECRET_TOKEN: <your apm secret token>
```

More details: https://www.elastic.co/guide/en/apm/agent/nodejs/current/lambda.html


## 4. Set up API Gateway

1. Create API
2. Create REST API
3. New API


Create resource/method

1. Create resource
2. Enable "Proxy resouce"
3. Resource name "api-test"
4. Press "Create resource"
5. Create another resource
6. Enable "Proxy resource"
7. Use Resource path "/api-test/"
8. Use resource name "{proxy+}"
9. Press "Create resource"
10. Click on the ANY method under {proxy+}
11. Click "Edit integration"
12. Integration type "Lambda Proxy"
13. Enable "Lambda proxy integration"
14. Select the Lambda function
15. Press "Save"
16. Press "Deploy API", use "v1" as stage (this must be included in the HTTP request)

AWS environment variables:

## 5. Invoke the API

Get the invoke URL for the API Gateway. Use this URL and make a GET request to

`https://<your api gateway id>.execute-api.eu-central-1.amazonaws.com/v1/api-test/ok`

and

`https://<your api gateway id>.execute-api.eu-central-1.amazonaws.com/v1/api-test/error`

When the APM data is collected, both of these requests will show up under the transaction `GET /v1/api-test/{proxy+}`.
