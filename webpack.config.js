// General libs
const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv').config()

// Webpack plugins 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require("copy-webpack-plugin");

// Directories 
const appDir = path.join(__dirname, 'app')
const distDir = path.join(__dirname, 'dist')
const nodeDir = path.join(__dirname, 'node_modules')
const pagesDir = path.join(__dirname, 'pages')

// Env variables
const DEV_ENV = process.env.NODE_ENV 

module.exports = {
  // Mode
  mode: DEV_ENV,
  // Entry
  entry: {
      app: path.join(appDir, 'index.js'),
  },

  // Output
  output: {
      filename: '[name].bundle.js',
      path: distDir
  },

  // Webpack plugins
  plugins: [
    // #1: Extract CSS from JS to separate css file
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[id].css',
    }),
    // #2: To have access to env variables 
    new webpack.DefinePlugin({
      DEV_ENV: DEV_ENV,
    }),
    // #3: Copy pages from src to build directory
    new CopyPlugin({
      patterns: [
        { from: pagesDir, to: distDir },
      ],
    }),
  ],

  // Webpack Loaders
  module: {
    rules: [
      // #1: Bundling Javascript
      {
        test: /\.m?js$/,
        exclude: nodeDir,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {"useBuiltIns": "usage", "corejs": 3}]
            ]
          }
        }
      },
      // #2: Bundling CSS 
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
          // Postcss
          "postcss-loader"
        ],
      },
    ]
  },
  
  // Development server setup
  devServer: {
    contentBase: distDir,
    compress: true,
    port: 9000,
  },
};
