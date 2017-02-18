"use strict";

const gulp = require("gulp");
const gutil = require("gulp-util");
const webpack = require("webpack");
const minimist = require("minimist");
const browserSync = require("browser-sync");

const config = require("./webpack.config.js");

const syncOptions = {
  server: {
    baseDir: "./",
    index: "index.html"
  }
};

gulp.task("webpack", function() {
  const env = minimist(process.argv.slice(2));
  let options = Object.create(config);

  if (env["min"]) {
    options.output.filename = "./js/build/bundle.min.js";
    options.plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  if (env["watch"] || env["browser-sync"]) {
    options.watch = true;
  }

  webpack(options, function(err, stats) {
    if (err) {
      throw new gutil.PluginError("webpack", err);
    }
    gutil.log("[webpack]", stats.toString());
  });

  if (env["browser-sync"]) {
    browserSync(syncOptions);
    gulp.watch(["./js/build/**", "./index.html", "./css/**"], function() {
      browserSync.reload();
    });
  }
});

gulp.task("serve", ["webpack"], function() {
  syncOptions.ghostMode = false;
  browserSync(syncOptions);
});

// Gulp コマンド
// readme.mdに書いてもいいが、開発時はgulpをグローバルにインストールしたくないため、
// npm run から叩くので、ここに書いておく。
// gulp webpack -> 普通に1回ビルド
// 引数:
//  --min : UglifyJsPluginをかける。出力はbundle.min.jsなので注意
//  --browser-sync : browser-syncで監視する。--watchもされる。
