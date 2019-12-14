import { s3Handler } from './s3Handler'
import { SIZES, ACCEPT_LIST, URL } from './constants'
import { getSourceBucket, getDestinationBucket } from '../../env'

//Core image processing package
const sharp = require('sharp')

class ResizeHandler {
  constructor() { }

  async _process(event) {

    const { eventName, bucket, key } = s3Handler.getFileInformation(event)

    console.log(`Received ${eventName} for item in bucket: ${bucket}, key: ${key}`)

    let image = key

    const path = this.validatePath(image)
    if (path.valid) {
      return await this.resize(image)
    }

    return path.data;
  }

  async resize(path) {
    try {
      const Key = path
      const sourceBucket = getSourceBucket()
      const destinationBucket = getDestinationBucket()
      let newKeys = []

      await Promise.all(SIZES.map(async (SIZE) => {
        let dimensionArray = SIZE.dimension.split('x')
        let width = parseInt(dimensionArray[0])
        let height = parseInt(dimensionArray[1])

        let newKey = this.filenameWithSize(path, SIZE.text)
        console.log(newKey)

        let streamResize = sharp().resize(width, height)
        // .resize(width, height, {
        //   fit: sharp.fit.fill
        // })

        const readStream = s3Handler.readStream({ Bucket: sourceBucket, Key })
        const { writeStream, uploaded } = s3Handler.writeStream({ Bucket: destinationBucket, Key: newKey })

        //data streaming
        readStream
          .pipe(streamResize)
          .pipe(writeStream)

        await uploaded

        newKeys.push(newKey)
      }));

      return this.generateResponse(true, 200, newKeys)
    } catch (error) {
      if (error.statusCode === 404) return this.response404()
      console.log(error)
      throw new Error(error)
    }
  }

  response404() {
    return this.generateResponse(false, 404, "The resource requested could not be found on this server.").data
  }

  validatePath(image) {
    if (!this.isImage(image)) {
      return this.generateResponse(false, 400, "Bad request - Could not determine the image type.")
    }
    return {
      valid: true
    }
  }

  isImage(path) {
    const fileExtension = this.getFileExtension(path);
    const fileTypeChecker = value => [fileExtension].some(element => element.includes(value));
    const fileType = ACCEPT_LIST.filter(fileTypeChecker);

    if (fileType.length === 0) {
      return false;
    }
    return true;
  }

  imageSize(path) {
    return SIZES.find((size) => {
      return path.includes(`${size.text}.${this.getFileExtension(path)}`);
    });
  }

  generateResponse(valid, statusCode, message) {
    return {
      valid,
      data: {
        statusCode,
        body: JSON.stringify({ message })
      }
    }
  }

  encodePath(path) {
    return encodeURIComponent(path)
  }

  decodePath(path) {
    return decodeURIComponent(path).replace(/\+/g, ' ')
  }

  originalFilename(path, sizeText) {
    const extension = this.getFileExtension(path)
    return this.filename(path).slice(0, -parseInt(sizeText.length)) + '.' + extension
  }

  filenameWithSize(path, size) {
    const extension = this.getFileExtension(path)
    return `${this.filename(path)}_${size}.${extension}`
  }

  filename(path) {
    return path.split('.').slice(0, -1).join('.');
  }

  getFileExtension(path) {
    return path.slice(((path.lastIndexOf('.') - 1) >>> 0) + 2);
  }
}

export const resizeHandler = new ResizeHandler()
