import { s3Handler } from './s3Handler'
import { SIZES, ACCEPT_LIST, URL } from './constants'

//Core image processing package
const sharp = require('sharp')

let imageSize

class ResizeHandler {
  constructor(){ }

  async _process(event) {
    let { image } = event.pathParameters
    console.log(image)
    image = this.decodePath(image)
    console.log(image)
    imageSize = this.imageSize(image);

    const path = this.validatePath(image)
    console.log(path.valid)
    console.log(path.data)
    if (path.valid) {
      return await this.resize(image)
    }

    return path.data;
  }

  async resize(path) {
    try {
      console.log(path);

      const originalFilename = this.originalFilename(path, imageSize.text);

      console.log('originalFilename: ' + originalFilename)

      const sizeArray = imageSize.size.split('x')
      const width = parseInt(sizeArray[0])
      const height = parseInt(sizeArray[1])

      const Key = originalFilename
      const newKey = path

      console.log('newKey: ' + newKey);

      const Bucket = process.env.BUCKET
      const streamResize = sharp()
        .resize(width, height)

      const readStream = s3Handler.readStream({ Bucket, Key })
      const { writeStream, uploaded } = s3Handler.writeStream({ Bucket, Key: newKey })

      //data streaming
      readStream
        .pipe(streamResize)
        .pipe(writeStream)

      await uploaded
      return {
        headers: { 'location': `${URL}/${this.encodePath(newKey)}` },
        statusCode: 301,
        body: ''
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  validatePath(image) {
    if (!this.isImage(image)) {
      return this.generateResponse(false, 400, "Bad request - Could not determine the image type.")
    }
    if (imageSize === undefined) {
      return this.generateResponse(false, 400, "Bad request - Could not determine the image size.")
    }
    return {
      valid: true
    }
  }

  isImage(path) {
    const fileExtension =  this.getFileExtension(path);
    const fileTypeChecker = value => [fileExtension].some(element =>    element.includes(value));
    const fileType = ACCEPT_LIST.filter(fileTypeChecker);

    if (fileType.length === 0) {
      return false;
    }
    return true;
  }

  imageSize(path) {
    return SIZES.find((size) => {
      console.log(`${size.text}.${this.getFileExtension(path)}`)
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

  filename(path) {
    return path.split('.').slice(0, -1).join('.');
  }

  getFileExtension(path) {
    return path.slice(((path.lastIndexOf('.') - 1) >>> 0) + 2);
  }
}

export const resizeHandler = new ResizeHandler()
