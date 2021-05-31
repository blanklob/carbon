// General libs
const path = require('path')
require('dotenv').config()

// Webpack plugins 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


// Directories 
const appDir = path.join(__dirname, 'app')
const distDir = path.join(__dirname, 'dist')
const nodeDir = path.join(__dirname, 'node_modules')
const pagesDir = path.join(__dirname, 'views')
const stylesDir = path.join(__dirname, 'styles')
const assetsDir = path.join(__dirname, 'assets')

// Env variables
const DEV_ENV = process.env.NODE_ENV || "development"

module.exports = {
  // Mode
  mode: DEV_ENV,
  // Entry
  entry: {
      app: path.join(appDir, 'index.js'),
      styles: path.join(stylesDir, 'index.scss')
  },
  
  // Output
  output: {
      filename: '[name].[hash].js',
      path: path.resolve(distDir),
      clean: true,
  },

  // Webpack plugins
  plugins: [
    // #1: Extract CSS from JS to separate css file
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    // #2: Generate Html files to dist
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(pagesDir, 'index.pug'),
    })
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
      // #2: Bundling SCSS 
      {
        test: /\.(sa|sc|c)ss$/,
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
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },

  resolve: {
    alias: {
      Assets: assetsDir,
      Pages: pagesDir,
      Styles: stylesDir,
      App: appDir,
      Dist: distDir
    },
  },
  
  // Development server setup
  devServer: {
    contentBase: distDir,
    compress: true,
    port: 9000,
  }
}
