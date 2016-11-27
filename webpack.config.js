// webpack.config.js
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var sassExtractor = new ExtractTextPlugin('../css/exdestroyer.css');
var HtmlWebpackPlugin = require('html-webpack-plugin');

if (process.env.NODE_ENV === 'development') {
  var loaders = ['react-hot', 'babel']
} else {
  var loaders = ['babel']
}
module.exports = {
  devtool: 'eval',
  entry: {
    'bundle': [
      // 'webpack/hot/dev-server',
      // 'webpack-dev-server/client?http://localhost:8080',
      './app-client.js'
    ]
  },
  output: {
    path: __dirname + '/public/dist',
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: loaders,
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      //loader: ExtractTextPlugin.extract(['css-loader', 'autoprefixer-loader?{browsers:["last 2 version", "Firefox 15"]}!sass-loader'])
      loaders: ["style-loader", "css-loader", "sass-loader"]
    }, {
      test: /\.css$/,
      loaders: ["style-loader", "css-loader"]
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,
      loader: 'url-loader?limit=8192&name=img/[name].[ext]'
    }],
  },
  sassLoader: {
    outputStyle: 'expanded',
    sourceMap: true
      // includePaths: [path.resolve(__dirname, "./some-folder")]
      // autoprefixer:{browsers:['last 2 versions']}
  },
  // otherSassLoaderConfig: {
  //   outputStyle: 'expanded',
  //   sourceMap: true
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.COSMIC_BUCKET': JSON.stringify(process.env.COSMIC_BUCKET),
      'process.env.COSMIC_READ_KEY': JSON.stringify(process.env.COSMIC_READ_KEY),
      'process.env.COSMIC_WRITE_KEY': JSON.stringify(process.env.COSMIC_WRITE_KEY)
    }),
    // sassExtractor,
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ // Also generate a test.html
      filename: '../index.html',
      template: './views/index.html',
    })
  ]
};