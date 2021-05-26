// General imports
const path = require('path')

// Directories path
const appDir = path.join(__dirname, 'app')
const styleDir = path.join(__dirname, 'styles')
const distDir = path.join(__dirname, 'dist')
const assetsDir = path.join(__dirname, 'assets')
const nodeDir = path.join(__dirname, 'node_modules')


module.exports = {
    mode: 'development',
    // Entry
    entry: {
        app: path.join(appDir, 'index.js')
    },

    // Output
    output: {
        filename: '[name].bundle.js',
        path: distDir
    },

    // Dev server configuration
    devServer: {
      contentBase: distDir,
      compress: true,
      port: 9000,
    },
  };