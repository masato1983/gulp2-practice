const gulp = require('gulp');

function printName(cb) {
  console.log('My name is Joe');
  cb();
}

function printAge(cb) {
  console.log('I am 30 years old');
  cb();
}

exports.printName = printName;