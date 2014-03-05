(function() {
  'use strict';

  var gulp   = require('gulp');
  var clean  = require('gulp-clean');
  var uglify = require('gulp-uglify');
  var rename = require('gulp-rename');

  gulp.task('clean', function() {
    return gulp.src([
      './typestring.min.js',
    ], { read: false })
    .pipe(clean());
  });

  gulp.task('default', ['clean'], function() {
  gulp.src('./typestring.js')
    .pipe(uglify({ preserveComments: function(s, n) { return !n.pos; } }))
    .pipe(rename(function(path) { path.basename += '.min'; }))
    .pipe(gulp.dest('.'));
  });

})();
