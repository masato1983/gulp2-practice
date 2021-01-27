const { watch, src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const shell = require('gulp-shell');
const pug = require('gulp-pug');
const plumber = require("gulp-plumber");

function pugs() {
  return src('./src/templates/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('./dist'))
    .pipe(browserSync.stream())
}

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
watch('./src/templates/**/*.pug', pugs)

exports.dev = series(parallel(pugs, styles, webpack), serve);
exports.prod = minifycss;