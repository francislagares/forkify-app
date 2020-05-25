const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/main.js',
    app: './src/js/app.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            // Enables Async/Await and Generator Functions in Babel and Node JS
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: '10'
                  }
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new FaviconsWebpackPlugin({
      logo: './src/img/favicon.png', // IMPORTANT url has to be set relative if not throws error at yarn build
      prefix: 'img/',
      mode: 'light'
    })
  ]
};
