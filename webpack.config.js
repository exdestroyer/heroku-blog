// webpack.config.js
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// multiple extract instances
let cssExtractor = new ExtractTextPlugin('stylesheets/[name].css');
let lessExtractor = new ExtractTextPlugin('stylesheets/[name].less');

if (process.env.NODE_ENV === 'development') {
  var loaders = ['react-hot', 'babel']
} else {
  var loaders = ['babel']
}
module.exports = {
  devtool: 'eval',
  entry: './app-client.js',
  output: {
    path: __dirname + '/public/dist',
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      loaders: loaders,
      exclude: /node_modules/
    }, 
    {
      test: /\.css$/,
      loader: "style!css"
    }, 
    {
      test: /\.(jpg|png)$/,
      loader: "url?limit=8192"
    }, 
    {
      test: /\.scss$/,
      loader: cssExtractor.extract(['css','sass'])
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.COSMIC_BUCKET': JSON.stringify(process.env.COSMIC_BUCKET),
      'process.env.COSMIC_READ_KEY': JSON.stringify(process.env.COSMIC_READ_KEY),
      'process.env.COSMIC_WRITE_KEY': JSON.stringify(process.env.COSMIC_WRITE_KEY)
    }),
    cssExtractor
  ]
};