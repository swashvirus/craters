const path = require('path')

module.exports = [{
        mode: 'production',
        entry: {
            './dist/craters.min.js': './src/craters'
        },

        output: {
            path: path.resolve(__dirname, './'),
            filename: '[name]'
        }
    },

    {
        mode: 'production',
        entry: {
            './dist/craters': './src/craters'
        },
        optimization: {
            minimize: false
        },
        output: {
            path: path.resolve(__dirname, './'),
            filename: '[name].js'
        }
    },

    {
        mode: "development",
        entry: {
            './dist/craters': './src/craters'
        },
        optimization: {
            minimize: false
        },
        output: {
            path: path.resolve(__dirname, './'),
            filename: '[name].dev.js'
        }
    }
];