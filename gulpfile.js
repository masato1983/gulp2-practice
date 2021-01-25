const gulp = require('gulp');

function printName(cb) {
  console.log('My name is Joe');
  cb();
}

exports.printName = printName;