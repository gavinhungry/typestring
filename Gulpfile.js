(function() {
  'use strict';

  var del    = require('del');
  var gulp   = require('gulp');
  var uglify = require('gulp-uglify');
  var rename = require('gulp-rename');

  gulp.task('clean', function(done) {
    del([
      './dist/',
    ], done);
  });

  gulp.task('default', ['clean'], function() {
  gulp.src('./typestring.js')
    .pipe(uglify({ preserveComments: function(s, n) { return !n.pos; } }))
    .pipe(rename(function(path) { path.basename += '.min'; }))
    .pipe(gulp.dest('./dist'));
  });

})();
