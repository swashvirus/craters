const path = require("path")
module.exports = [{
        mode: "production",
        entry: {
            "./dist/craters": "./src/craters"
        },
        output: {
            path: path.resolve(__dirname, "./"),
            filename: "[name].min.js"
        }
    }
]