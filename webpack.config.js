const { env: { NODE_ENV: env } } = process
const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')

const config = {
  entry: './index.js',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  }
}

if (env === 'production') {
  config.plugins = [new MinifyPlugin()]
} else {
  config.module = {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}

module.exports = config
