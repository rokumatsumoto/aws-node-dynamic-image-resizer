# aws-node-dynamic-image-resizer

Bucket event-driven image resizing built with cloud functions.

In this example, we set up a image resizing solution with AWS S3 and a Serverless framework function written in Node.js. We use [the `sharp` package](https://www.npmjs.com/package/sharp) for image resizing.

`sharp` includes native dependencies, so in this example we are building and deploying the Serverless function from a Docker container that’s based on Amazon Linux.

## Pre-requisites

In order to deploy the function, you will need the following:

- Two S3 bucket in your AWS account.
- Serverless framework installed locally via `yarn global add serverless`.
- `Node.js` and `yarn` installed locally.
- Docker and docker-compose installed locally.

## Deploying the Serverless project

1. Clone the repository

   ```sh
   git clone https://github.com/rokumatsumoto/aws-node-dynamic-image-resizer.git
   ```

2. Install the dependencies

   ```sh
   yarn install
   ```

3. Add your AWS credentials into the `secrets/secrets.env` file
4. Add your env variables into the `.env` file
5. Deploy the Serverless project

   ```sh
   docker-compose up --build
   ```
