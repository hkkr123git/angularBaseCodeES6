var path = require("path");
module.exports = {
  entry: './app/app.js',
  output: {
    path: path.resolve(__dirname, "build/app"),
    filename: 'main.min.js',
    publicPath: '/build/app/',
  },
  resolve: {
    root: './app',
  },
  module: {
    preLoaders: [
   {test: /\.js$/, loader: "flowtype", include: /(app)/}
 ],
    loaders: [
      { test: /\.js$/, include: /(app)/, loader: 'ng-annotate!babel-loader'}
    ]
  }
};
