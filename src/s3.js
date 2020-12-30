async function uploadFileToS3({ S3, bucketname, filename, csvData }) {
  
  // Setting up S3 upload parameters
  const s3UploadParams = {
    Bucket: bucketname,
    Key: filename,
    Body: csvData,
  }

  // Uploading files to the bucket
  await S3.upload(s3UploadParams).promise();
}

module.exports = { uploadFileToS3 }