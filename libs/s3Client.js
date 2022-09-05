const { S3Client } = require("@aws-sdk/client-s3");
// Set the AWS Region.
const REGION = process.env.AWS_REGION;
const AWS_ID = process.env.AWS_ID;
const AWS_SECRET = process.env.AWS_SECRET;

// Create an Amazon S3 service client object.
exports.s3Client = new S3Client({ 
    region: REGION,
    credentials:{
        accessKeyId: AWS_ID,
        secretAccessKey: AWS_SECRET
    }
});

