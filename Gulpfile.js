(() => {
  'use strict';

  let del = require('del');
  let gulp = require('gulp');
  let minify = require('gulp-minify');

  gulp.task('clean', () => del(['./dist/']));

  gulp.task('build', ['clean'], () => {
    gulp.src('./typestring.js')
      .pipe(minify({
        ext: { min: '.min.js' },
        noSource: true,
        preserveComments: (s, n) => !n.pos,
      }))
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('default', ['build']);

})();
