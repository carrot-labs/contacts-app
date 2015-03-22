/**
 * Module dependencies
 */

var gulp    = require('gulp');
var browser = require('browser-sync');
var jeet    = require('jeet');
var kouto   = require('kouto-swiss');
var plumber = require('gulp-plumber');
var reload  = require('browser-sync').reload;
var rupture = require('rupture');
var stylus  = require('gulp-stylus');

/**
 * Server task
 *
 * Creates a server and opens a browser
 */

gulp.task('server', function() {
  browser({
    server: {
      baseDir: './app'
    },
    port: 4000
  });
});

/**
 * Reload task
 *
 * Reloads the browser
 */

gulp.task('reload', function() {
  reload();
});

/**
 * Stylus task
 *
 * Convert all stylus files into css
 */

gulp.task('stylus', function () {
  return gulp
    .src('app/**/*.styl')
    .pipe(plumber())
    .pipe(stylus({
      // compress: true,
      use: [jeet(), kouto(), rupture()]
    }))
    .pipe(reload({stream: true}))
    .pipe(gulp.dest('app'));
});

/**
 * Watch task
 */

gulp.task('watch', ['server', 'stylus'], function() {
  gulp.watch('app/**/*.styl', ['stylus']);

  gulp.watch('app/**/*.html', ['reload']);
});

/**
 * Default task
 */

gulp.task('default', ['watch']);