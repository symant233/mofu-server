const path = require('path');

module.exports = {
  target: 'node',
  entry: ['@babel/polyfill', './server/index.js'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
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
  externals: [
    {
      formidable: 'commonjs formidable',
    },
  ],
};
