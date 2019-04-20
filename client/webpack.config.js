const FileManagerPlugin = require ('filemanager-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require ('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CrossoriginWebpackPlugin = require('crossorigin-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
      filename: 'index.[hash].js',
      path: path.join(__dirname, 'dist'),
      publicPath: 'http://localhost:8001'
    },
    mode: 'production',
    devtool: false,
    optimization: {
        noEmitOnErrors: true,
        minimizer: [new UglifyJsPlugin({
                sourceMap: true,
            })
        ]
    },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html')
    }),
    new CrossoriginWebpackPlugin (),
    new webpack.SourceMapDevToolPlugin ({
      publicPath: 'http://localhost:8002/',
      filename: '[file].map',
    }),
    new FileManagerPlugin ({
      onStart: [{
        delete: ['./dist'],
      }],
      onEnd: [{
          copy: [
            { source: './dist/*.js', destination: path.resolve(__dirname, '../cdn-server') },
            { source: './dist/*.map', destination: path.resolve(__dirname, '../monitor-server/sourcemaps/dist') },
            { source: './dist/*.html', destination: path.resolve(__dirname, '../server') },
          ]
        }]
      })
    ]
}