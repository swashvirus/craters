const path = require('path')

module.exports = [{
        mode: 'production',
        entry: {
            './dist/craters.min.js': './craters/craters.js'
        },

        output: {
            path: path.resolve(__dirname, './'),
            filename: '[name]'
        }
    },

    {
        mode: 'production',
        entry: {
            './dist/craters.js': './craters/craters.js'
        },
        optimization: {
            minimize: false
        },
        output: {
            path: path.resolve(__dirname, './'),
            filename: '[name]'
        }
    },

    {
        mode: "development",
        entry: {
            './dist/craters.dev': './craters/craters.js'
        },
        optimization: {
            minimize: false
        },
        output: {
            path: path.resolve(__dirname, './'),
            filename: '[name].js'
        }
    }
];