const path = require('path');

module.exports = {
    entry: {
        './build/game': './app/game.js',
        './dist/craters': './dist/craters'
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: '[name].min.js'
    }
};