const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  plugins: [
  ],
  optimization: {
    concatenateModules: true,
    usedExports: true,
    runtimeChunk: {
      name: 'runtime'
    },
    nodeEnv: 'production'
  },
  entry: {
    app: [
      path.resolve(__dirname, 'js/index.js'),
      path.resolve(__dirname, 'js/serapoint.js'),
      path.resolve(__dirname, 'js/serapoint_config.js'),
      path.resolve(__dirname, 'js/serapoint_UI.js'),
      path.resolve(__dirname, 'js/serapoint_context-menu.js')
    ]
  },
  //devtool: 'inline-source-map', //turn on it for debuging
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            ['env', {option: 'react'}],
            require.resolve('babel-preset-react'),
            [require.resolve('babel-preset-es2015'), { "modules": false }],
            require.resolve('babel-preset-stage-0')
          ]
        }
      }
    ]
  }
};