const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const mode = devMode ? 'development' : 'production'

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },

  performance: { hints: !devMode }, // hide warnings

  mode: mode,

  devtool: devMode ? 'eval' : false,

  module: {
    rules: [{
      test: /\.(sa|sc|c)ss$/,
      use: [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
      exclude: [
        /node_modules/,
      ],
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
          }
        }
      ],
    }]
  },

  plugins: [
    new CleanWebpackPlugin('dist/*'),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin(),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

}

