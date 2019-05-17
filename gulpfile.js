const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks-render');
const bs = require('browser-sync');
const del = require('del');

exports.cleanDist = function cleanDist() {
  return del('./dist/**/*');
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

exports.default = gulp.series(exports.cleanDist, exports.render);

exports.watch = gulp.series(exports.default, browserSync, function watch() {
  gulp.watch(['src/**/*.njk']).on('change', bs.reload);
});
