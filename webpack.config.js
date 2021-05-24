// Node imports
const path = require('path')

// Directories names
const dirDist = path.join(__dirname, 'public')
const dirApp = path.join(__dirname, 'app')


module.exports = {
  mode: 'development',
  entry: {
    app: dirApp + '/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: dirDist,
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: dirDist,
    compress: true,
    port: 9000,
  },
}