const { src, dest, series, parallel } = require('gulp');
const sass = require('gulp-sass');

function styles() {
  return src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/css'))
}

exports.styles = styles;