const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, 'client/public')
const APP_DIR = path.resolve(__dirname, 'client/src')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

const extractCSS = new ExtractTextPlugin('styles.css')

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.js'
  }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
]

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false
      },
    }),
    extractCSS
  );
}

module.exports = {
  devtool: isProd ? 'source-map' : 'eval',
  context: APP_DIR,
  entry: {
    js: [
      'index.js',
      'pages/Home'
    ],
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: isProd ?
          extractCSS.extract({
            fallbackLoader: 'style-loader',
            loader: ['css-loader', 'sass-loader'],
          }) :
          ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js?/,
        include: APP_DIR,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      APP_DIR,
      'node_modules'
    ]
  },
  plugins: plugins
}