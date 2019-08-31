import { resizeHandler } from './resizeHandler'

export const handler = async (event) => {
  try {
    return await resizeHandler._process(event)
  } catch (error) {
    console.log(error)
    return new Error(error)
  }
}
