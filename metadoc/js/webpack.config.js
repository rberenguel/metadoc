const path = require('path')
const merge = require("webpack-merge")
// Load the config generated by scalajs-bundler
const config = require('./scalajs.webpack.config')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ResourcesDir = path.resolve(__dirname, '../../../../src/main/resources')
const MonacoEditorBaseDir = path.resolve(__dirname, 'node_modules/monaco-editor/min')

module.exports = merge(config, {
  entry: {
    'index': path.resolve(ResourcesDir, 'index.js')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader?' + JSON.stringify({
          compilerOptions: {
            // Override tsconfig.json to enable import of the monaco types in scala.ts
            baseUrl: MonacoEditorBaseDir
          }
        })
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(MonacoEditorBaseDir, 'vs'),
        to: 'vs',
      }
    ]),
    new HtmlWebpackPlugin({
      inject: true,
      favicon: ResourcesDir + '/images/favicon.png',
      template: ResourcesDir + '/index.html',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
});
