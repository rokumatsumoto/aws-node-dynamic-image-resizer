import { getFileInformation } from '../s3'
import { DEFAULT_SIZE_LIST } from '../constants'
import { resize } from '../resize'
import { getDestinationBucket } from '../env'

export const main = async (event, context, callback) => {
  const { eventName, bucket, key } = getFileInformation(event)

  console.log(`Received ${eventName} for item in bucket: ${bucket}, key: ${key}`)

  try {
    const buckets = { sourceBucket: bucket, destinationBucket: getDestinationBucket() }
    await resize(buckets, key, DEFAULT_SIZE_LIST)
  } catch (error) {
    callback(error)
  }

}
