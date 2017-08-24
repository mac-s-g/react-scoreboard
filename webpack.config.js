const path = require('path');
const webpack = require('webpack');
const wds_port = 3000;

const PATHS = {
    src: path.join(__dirname, 'src'),
    js: path.join(__dirname, 'src/js'),
    fonts: path.join(__dirname, 'src/fonts/'),
    style: path.join(__dirname, 'src/style'),
    build: path.join(__dirname, 'public'),
    devServer: path.join(__dirname, 'dev-server'),
};

console.log(new webpack.EnvironmentPlugin(['NODE_ENV']))
console.log(process.env.NODE_ENV)

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

const entrypoint = PATHS.js + '/index.js';

const config = {
  entry: [entrypoint],
  externals: {
    'cheerio': 'window',
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
        umd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
        umd: 'react-dom'
      },
  },
  devServer: {
    host: '0.0.0.0',
    port: wds_port,
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: PATHS.devServer
  },
  output: {
    path: PATHS.build,
    filename: 'main.js',
    library: 'reactDockerTemplate',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: [".js", ".json", ".css", ".scss"]
  },
  devtool: process.env.NODE_ENV == 'production' ? false : 'eval-source-map',
  module: {
    rules: [
      {
        // images and font faces
        // http://www.fontriver.com/font/dot_matrix/download.html
        // https://transfonter.org/
        test: /\.(ttf|png|jpe?g|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: [PATHS.js]
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
};

module.exports = config;
