// webpack.config.js
module.exports = {  
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: {
    app: ['./src/index.jsx']
  },
  output: {
    filename: '[name].js',
    path: './build',
    publicPath: '/'
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    inline: true
  },
  module: {
    loaders: [
      {
        test: /(\.js|.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}