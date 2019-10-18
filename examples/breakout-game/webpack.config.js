const path = require('path')

module.exports = {
    entry: {
        './game': './game.js'
    },
    output: {
        path: path.resolve(__dirname, './'),
        filename: '[name].min.js'
    },
    resolve: {
        modules: ['node_modules']
    }
}