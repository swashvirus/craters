const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    './build/game.min.js': './app/game.js',
    './dist/craters.min.js': './dist/craters.js',
    './dist/craters.min.mjs': './dist/craters.mjs'
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name]'
  }
}