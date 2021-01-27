const path = require('path');

module.exports = {
  entry: {
    firstComp: './src/js/firstComp/index.js'
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  mode: 'development',
  optimization: {
    splitChunks: {
      name: 'vendors',
      chunks: 'all'
    }
  }
};