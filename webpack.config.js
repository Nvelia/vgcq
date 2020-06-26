module.exports = {
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
  // module: {
  //     loaders: [
  //         {
  //             test: /\.(jpg|jpeg|gif|png|ico)$/,
  //             exclude: /node_modules/,
  //             loader: 'file-loader?name=[name].[ext]'
  //         },
  //         {
  //             test: /\.js$/,
  //             exclude: /node_modules/,
  //             loader: 'babel-loader',
  //             query: {
  //                 presets: ["es2016", "react", "env", "stage-2"]
  //             }
  //         }
  //     ]
  // }
};
