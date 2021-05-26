// General libs
const path = require('path')

// Webpack plugins 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Directories 
const appDir = path.join(__dirname, 'app')
const styleDir = path.join(__dirname, 'styles')
const distDir = path.join(__dirname, 'dist')
const assetsDir = path.join(__dirname, 'assets')
const nodeDir = path.join(__dirname, 'node_modules')


module.exports = {
  // Mode
  mode: 'production',
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
