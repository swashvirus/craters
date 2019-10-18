const path = require('path')

module.exports = {
  entry: {
    './dist/craters.min.js': './dist/craters.js',
    './dist/craters.min.mjs': './dist/craters.mjs'
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name]'
  }
}