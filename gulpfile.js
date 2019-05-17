const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks-render');
const bs = require('browser-sync');
const del = require('del');

exports.cleanDist = function cleanDist() {
  return del('./dist/**/*');
};

exports.copyMedia = function copyMedia() {
  return gulp.src('src/media/**/*', {base: 'src'})
      .pipe(gulp.dest('dist'));
};

exports.render = function render() {
  return gulp.src(['src/**/*.njk', '!src/media/**', '!src/templates/**'],
      {base: 'src'}).pipe(nunjucks({
    path: './src/templates',
  })).pipe(gulp.dest('dist'));
};

function browserSync() {
  bs.init({
    server: {
      baseDir: './dist',
    },
  });
}

exports.default = gulp.series(exports.cleanDist, gulp.parallel(exports.render, exports.copyMedia));

exports.watch = gulp.series(exports.default, browserSync, function watch() {
  gulp.watch(['src/**/*.njk']).on('change', bs.reload);
  gulp.watch(['src/media/**/*'], gulp.series(exports.copyMedia));
});
