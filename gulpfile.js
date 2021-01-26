const { watch, src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function styles() {
  return src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(dest('./dist/css'))

function serve() {
  browserSync.init({
    server: './dist',
    browser: 'google chrome'
  })
}

watch('./src/sass/**/*.scss', styles)

exports.styles = styles;