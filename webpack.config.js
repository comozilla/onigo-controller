module.exports = {
  cache: true,
  entry: "./js/main.js",
  output: {
    path: __dirname,
    filename: "./js/build/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          cacheDirectory: true,
          presets: ["es2015"]
        }
      },
      { test: /\.vue$/, loader: "vue-loader" },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(jpg|png)$/, loaders: "url-loader" },
      // 下のものは、url-loaderでやると１ファイルにまとまっていいが、
      // font-awesomeが特別な種類のフォントを使っている問題でまとめられないからfile-loaderでやっている
      {
        test: /\.(ttf|eot|svg|woff2|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=js/build/[path][name].[ext]"
      }
    ]
  },
  resolve: {
    modules:
      ["web_modules", "node_modules", "bower_components", "alias"],
    alias: {
      "font-awesome": "font-awesome/css/font-awesome.css",
      "web-animations-js": "web-animations-js/web-animations-next.min.js",
      "w3c-blob": "blob.js"
    },
    descriptionFiles: ["package.json", "bower.json"]
  }
};

