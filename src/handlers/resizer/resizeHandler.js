import { s3Handler } from './s3Handler'
import { SIZES } from './constants'

//Core image processing package
const sharp = require('sharp')

class ResizeHandler {
  constructor(){ }

  async _process(event) {
    const { image } = event.pathParameters
    return await this.resize(image)
  }

  async resize(path) {
    try {
      console.log(path);

      const SIZE = SIZES.find((size) => {
        return path.includes(size.text);
      });

      const originalFilename = this.originalFilename(path, SIZE.text);

      console.log('originalFilename: ' + originalFilename);

      const sizeArray = SIZE.size.split('x')
      const width = parseInt(sizeArray[0])
      const height = parseInt(sizeArray[1])

      const Key = originalFilename;
      const newKey = path;

      console.log('newKey: ' + newKey);

      const Bucket = process.env.BUCKET
      const streamResize = sharp()
        .resize(width, height)
        .toFormat('jpeg')

      const readStream = s3Handler.readStream({ Bucket, Key })
      const { writeStream, uploaded } = s3Handler.writeStream({ Bucket, Key: newKey })

      //data streaming
      readStream
        .pipe(streamResize)
        .pipe(writeStream)

      await uploaded
      return newKey
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  originalFilename(path, sizeText) {
    const filenameWithoutExtension = path.split('.').slice(0, -1).join('.');
    const extension = path.slice(((path.lastIndexOf('.') - 1) >>> 0) + 2);

    return filenameWithoutExtension.slice(0, -parseInt(sizeText.length)) + '.' + extension;
  }
}

export const resizeHandler = new ResizeHandler()
