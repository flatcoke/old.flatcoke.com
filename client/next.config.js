const withTypescript = require('@zeit/next-typescript')
const path = require('path')
const Dotenv = require('dotenv-webpack')

require('dotenv').config()

module.exports = withTypescript({
  distDir: '../.next',
  webpack: config => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ]
    return config
  },
})
