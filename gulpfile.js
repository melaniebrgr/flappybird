var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var webserver = require('gulp-webserver');

var paths = {
  assets: [
    'site/js/vendor/jquery-1.12.0.min.js',
    'site/js/vendor/modernizr-2.8.3.min.js'
  ]
};

// JavaScript site task, lint JS
gulp.task('jshint', function() {
  return gulp.src('site/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
// SCSS site task, compile Sass to task
gulp.task('sass', function() {
  return gulp.src('site/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('site/css'));
});


// HTML build task, minify index.html
gulp.task('html', function() {
  return gulp.src('site/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});
// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
  return browserify('site/js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});
// Styles build task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src('site/css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
});
// Image build task, optimizes images
gulp.task('images', function() {
  return gulp.src('site/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});
gulp.task('copy', function() {
  return gulp.src(paths.assets, {
    base: 'site'
  })
    .pipe(gulp.dest('build'))
  ;
});


// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles', 'images', 'copy']);
// Watch task
gulp.task('default', ['build','webserver'], function(){
  gulp.watch('./site/js/*.js', ['jshint', 'build']);
  gulp.watch('./site/scss/**/*.scss', ['sass', 'build']);
});


// Webserver
// Note: include directoryListing to get actual page (not file structure)
gulp.task('webserver', function() {
  gulp.src('build')
    .pipe(webserver({
      livereload: true,
      directoryListing: { enable: true, path: 'flappybird' },
      open: true
    }));
});