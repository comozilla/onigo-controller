const webpack = require("webpack");

module.exports = {
  cache: true,
  entry: "./js/main.js",
  output: {
    path: __dirname,
    filename: "./js/build/bundle.js"
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: "vue" },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          cacheDirectory: true,
          presets: ["es2015"]
        }
      },
      // 下のものは、url-loaderでやると１ファイルにまとまっていいが、
      // font-awesomeが特別な種類のフォントを使っている問題でまとめられないからfile-loaderでやっている
      {
        test: /\.(ttf|eot|svg|woff2|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file?name=js/build/[path][name].[ext]"
      }
    ]
  },
  resolve: {
    modulesDirectories: ["web_modules", "node_modules", "bower_components", "alias"],
    alias: {
      "font-awesome": "font-awesome/css/font-awesome.css",
      "web-animations-js": "web-animations-js/web-animations-next.min.js",
      "w3c-blob": "blob.js"
    }
  },
  plugins: [new webpack.ResolverPlugin(
    new webpack.ResolverPlugin
      .DirectoryDescriptionFilePlugin("bower.json", ["main"])
  )]
};
