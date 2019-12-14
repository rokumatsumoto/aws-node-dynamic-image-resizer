const THUMB = {
  dimension: '113x113',
  text: 'thumb',
}

const MEDIUM = {
  dimension: '234x234',
  text: 'medium',
}

const LARGE = {
  dimension: '480x480',
  text: 'large',
}

export const SIZES = [THUMB, MEDIUM, LARGE];

export const ACCEPT_LIST = ['jpg', 'jpeg', 'gif', 'png', 'JPG', 'JPEG', 'GIF', 'PNG']

export const URL = `https://${process.env.DESTINATION_BUCKET}.s3.${process.env.REGION}.amazonaws.com`
