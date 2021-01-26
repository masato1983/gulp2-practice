const { watch, src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');

function styles() {
  return src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({
      format: 'beautify'
    }))
    .pipe(dest('./dist/css'))
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

exports.serve = serve;
exports.minifycss = minifycss;