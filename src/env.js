export function getDestinationBucket() {
  return process.env.DESTINATION_BUCKET
}

export function getSourceBucket() {
  return process.env.SOURCE_BUCKET
}

export function getDestinationBucketAcl() {
  return process.env.DESTINATION_BUCKET_ACL
}
