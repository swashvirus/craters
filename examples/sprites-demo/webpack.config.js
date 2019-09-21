const path = require('path');

module.exports = {
  entry: {'./src/game': './src/game.js'},
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].min.js'
  },
  resolve: {
	  modules: ['node_modules']
  }
};