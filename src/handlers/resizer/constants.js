const THUMB = {
  size: '113x113',
  text: '_thumb',
}

const LARGE = {
  size: '480x480',
  text: '_large',
}

export const SIZES = [THUMB, LARGE];

export const ACCEPT_LIST = ['jpg', 'jpeg', 'gif', 'png','JPG', 'JPEG', 'GIF', 'PNG']

export const URL = `http://${process.env.BUCKET}.s3-website.${process.env.REGION}.amazonaws.com`
