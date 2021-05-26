// General imports
const path = require('path')

// Webpack plugins imports
const CopyPlugin = require('copy-webpack-plugin')

// Directories path
const appDir = path.join(__dirname, 'app')
const styleDir = path.join(__dirname, 'styles')
const distDir = path.join(__dirname, 'dist')
const assetsDir = path.join(__dirname, 'assets')
const nodeDir = path.join(__dirname, 'node_modules')


module.exports = {
    mode: 'production',
    // Entry
    entry: {
        app: path.join(appDir, 'index.js')
    },

    // Output
    output: {
        filename: '[name].bundle.js',
        path: distDir
    },

    // Webpack plugins
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: assetsDir, to: distDir},
        ],
      }),
    ],

    // Webpack Loaders
    module: {
      rules: [
        // Use Babel for Javascript
        {
          test: /\.m?js$/,
          exclude: nodeDir,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    
    // Development server setup
    devServer: {
      contentBase: distDir,
      compress: true,
      port: 9000,
    },
  };