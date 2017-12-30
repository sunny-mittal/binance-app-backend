const { env: { NODE_ENV: env } } = process
const path = require('path')

const config = {
  entry: {
    app: './src/index.js'
  },
  target: 'node',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = config
