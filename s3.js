const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./libs/s3Client.js");



// Upload file to specified bucket.
exports.uploadFile = async (key, body) => {
  try {
    const data = await s3Client.send(new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Body: body,
    }));

    return data;
  } catch (err) {
    console.log("Error", err);
    return err;
  }
};

  // Create a presigned URL.
exports.getPreSignedUrl = async (key, body) => {

   const bucketParams = {
    Bucket: `${process.env.BUCKET_NAME}`,
    Key: `${key}`,
    Body: body
  };

   try {
    // Create a command to put the object in the S3 bucket.
    const command = new PutObjectCommand(bucketParams);
    // Create the presigned URL.
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    console.log(
      `\nPutting "${bucketParams.Key}" using signedUrl with body "${bucketParams.Body}" in v3`
    );
    console.log(signedUrl);
    const response = await fetch(signedUrl, {method: 'PUT', body: bucketParams.Body});
    console.log(
      `\nResponse returned by signed URL: ${await response.text()}\n`
    );
  } catch (err) {
    console.log("Error creating presigned URL", err);
  }
}





