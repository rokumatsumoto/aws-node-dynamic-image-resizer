import * as AWS from 'aws-sdk'
import stream from 'stream'
import { getDestinationBucketAcl } from '../../env'

const mime = require('mime/lite')
const S3 = new AWS.S3()

class S3Handler {
  constructor() { }

  headObject({ Bucket, Key }) {
    return S3.headObject({ Bucket, Key }).promise();
  }

  readStream({ Bucket, Key }) {
    return S3.getObject({ Bucket, Key }).createReadStream()
  }

  writeStream({ Bucket, Key }) {
    const passThrough = new stream.PassThrough()
    return {
      writeStream: passThrough,
      uploaded: S3.upload({
        ACL: getDestinationBucketAcl(),
        ContentType: mime.getType(Key),
        Body: passThrough,
        Bucket,
        Key
      }).promise()
    }
  }

  getFileInformation({ Records: [{ eventName, s3: { bucket, object } }] }) {
    return {
      eventName,
      bucket: bucket.name,
      key: decodeURIComponent(object.key).replace(/\+/g, ' ')
    }
  }
}

export const s3Handler = new S3Handler()
