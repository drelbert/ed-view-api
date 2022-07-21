import pkg from 'lodash'
const { merge } = pkg
const env = process.env.NODE_ENV

export const baseConfig = {
  env,
  secrets: {
    jwt: process.env.ACCESS_TOKEN,
    jwtExp: '2hr',
  },
}

export default merge(baseConfig)
