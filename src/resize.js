import { getObjectStream, uploadStream } from './s3'

const sharp = require('sharp')

export function resize(buckets, key, targetSizeList) {
  return new Promise((resolve, reject) => {
    const readStream = getObjectStream(buckets.sourceBucket, key)
    Promise.all(
      targetSizeList.map(async (size) => {
        const { width, height } = getDimension(size.dimension)

        const targetKey = filenameWithSize(key, size.text)

        const resizeStream = sharp().resize(width, height)

        const { writeStream, uploaded } = uploadStream(buckets.destinationBucket, targetKey)

        readStream
          .pipe(resizeStream)
          .pipe(writeStream)

        await uploaded
      })
    ).then(resolve).catch(reject)
  })
}

export function getDimension(dimension) {
  const dimensionArray = dimension.split('x')

  return {
    width: parseInt(dimensionArray[0]),
    height: parseInt(dimensionArray[1])
  }
}

export function filenameWithSize(path, size) {
  return `${filename(path)}_${size}.${extension(path)}`
}

export function extension(path) {
  return path.slice(((path.lastIndexOf('.') - 1) >>> 0) + 2);
}

export function filename(path) {
  return path.split('.').slice(0, -1).join('.');
}


