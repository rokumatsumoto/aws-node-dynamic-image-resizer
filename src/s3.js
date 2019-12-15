import AWS from 'aws-sdk'
import stream from 'stream' // TODO: use node.js stream
import { getDestinationBucketAcl } from './env'

const mime = require('mime/lite')
const s3 = new AWS.S3()

export function getObjectStream(Bucket, Key) {
  console.log(`Streaming ${Key} data from ${Bucket}`)

  return s3.getObject({ Bucket, Key }).createReadStream()
}

export function uploadStream(Bucket, Key) {
  console.log(`Uploading ${Key} to ${Bucket} via stream data`)

  const passThrough = new stream.PassThrough()

  return {
    writeStream: passThrough,
    uploaded: s3.upload({
      Bucket,
      Key,
      Body: passThrough,
      ACL: getDestinationBucketAcl(),
      ContentType: mime.getType(Key)
    }).promise()
  }
}

export function getFileInformation({ Records: [{ eventName, s3: { bucket, object } }] }) {
  return {
    eventName,
    bucket: bucket.name,
    key: decodeURIComponent(object.key).replace(/\+/g, " ")
  }
}
