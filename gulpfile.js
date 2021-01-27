const { watch, src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const shell = require('gulp-shell')

function styles() {
  return src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(cleanCSS({
        format: 'beautify'
      }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/css'))
    .pipe(browserSync.stream())
}

function webpack() {
  return src('./src/js/**/*.js', {read: false})
    .pipe(shell([
      'webpack'
    ]))
    .pipe(browserSync.stream())
}

function serve() {
  browserSync.init({
    server: './dist',
    browser: 'google chrome'
  })
}

function minifycss() {
  return src('./dist/css/**/*.css')
    .pipe(cleanCSS())
    .pipe(dest('./dist/css'))
}

watch('./src/sass/**/*.scss', styles)
watch('./src/js/**/*.js', webpack)

exports.dev = series(parallel(styles, webpack), serve);
exports.prod = minifycss;