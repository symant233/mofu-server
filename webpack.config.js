const path = require('path');

module.exports = {
  target: 'node',
  entry: ['@babel/polyfill', './server/index.js'],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
};
