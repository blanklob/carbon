// General libs
const path = require('path')
require('dotenv').config()

// Webpack plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin')


// Directories
const appDir = path.join(__dirname, 'app')
const distDir = path.join(__dirname, 'dist')
const nodeDir = path.join(__dirname, 'node_modules')
const viewsDir = path.join(__dirname, 'views')
const stylesDir = path.join(__dirname, 'styles')
const assetsDir = path.join(__dirname, 'assets')
const pagesDir = path.join(viewsDir, 'pages')

// Env variables
const DEV_ENV = process.env.NODE_ENV || "production"

module.exports = {
  // Mode
  mode: DEV_ENV,
  // Entry
  entry: {
      index: [path.join(appDir, 'index.js'), path.join(stylesDir, 'pages/index.scss')],
      results: [path.join(appDir, 'results.js'), path.join(stylesDir, 'pages/results.scss')],
      about: [path.join(appDir, 'about.js'), path.join(stylesDir, 'pages/about.scss')]
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
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: "results.html",
      template: path.join(pagesDir, 'results.pug'),
      chunks: ['results']
    }),
    new HtmlWebpackPlugin({
      filename: "404.html",
      template: path.join(pagesDir, '404.pug'),
      chunks: ['about']
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      template: path.join(pagesDir, 'about.pug'),
      chunks: ['about']
    }),
    new HtmlWebpackPlugin({
      filename: "privacy.html",
      template: path.join(pagesDir, 'privacy.pug'),
      chunks: ['about']
    }),
    // #3: Copy images from Assets to Dist
    new CopyPlugin({
      patterns: [
        { from: path.join(assetsDir, 'shared'), to: distDir },
      ],
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],

  // Webpack Loaders
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      // #1: Bundling Javascript
      {
        test: /\.m?js$/,
        exclude: nodeDir,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ]
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
        generator: {
          filename: 'fonts/[name][ext]'
        }

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
      Views: viewsDir,
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
  },
}
