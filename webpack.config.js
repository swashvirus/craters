const path = require('path');

module.exports = {
  entry: './app/game.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'game.min.js'
  }
};