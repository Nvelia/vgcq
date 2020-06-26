module.exports = {
  mode: "production",
  entry: __dirname + "/src/index.js",
  output: {
    path: __dirname + "/public",
    publicPath: "/public/locales/",
    // filename: "assets/bundle.js",
    chunkFilename: "[name].js",
  },
  // devServer: {
  //     contentBase: __dirname + "/assets/",
  //     inline: true,
  //     host: '0.0.0.0',
  //     port: 8080,
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
