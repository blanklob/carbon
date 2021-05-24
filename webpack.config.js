// Node imports
const path = require('path')

// Webpack plugins
const DefinePlugin = require('webpack').DefinePlugin
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Directories names
const dirPublic = path.join(__dirname, 'public')
const dirApp = path.join(__dirname, 'app')
const dirStyles = path.join(__dirname, 'styles')
const dirAssets = path.join(__dirname, 'assets')
const dirNode = path.join(__dirname, 'node_modules')

// Node env
const PROJECT_ENV = process.env.NODE_ENV
const IS_DEVELOPMENT = PROJECT_ENV === 'development'
const IS_PRODUCTION = PROJECT_ENV === 'production'

// Webpack conf exportation
module.exports = {
  mode: 'development',
  entry: {
    app: path.join(dirApp, 'index.js'),
  },

  output: {
    filename: '[name].bundle.js',
    path: dirPublic,
  },

  resolve: {
    modules: [
      dirApp,
      dirAssets,
      dirStyles,
      dirNode
    ]
  },

  plugins: [
    // Allow global constants accessed at compile time
    new DefinePlugin({
      IS_PRODUCTION,
      IS_DEVELOPMENT
    }),
    
    // Copying files from one directory to another one
    new CopyWebpackPlugin({
      patterns: [
        { from: dirAssets, to: dirPublic },
        // { from: "other", to: "public" },
      ],
    }),

    // Extract Css from JS 
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ],

  devServer: {
    contentBase: dirPublic,
    compress: true,
    port: 5000,
  },

  module: {
    rules: [
      // For .js files 
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // For .css files
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  }
}