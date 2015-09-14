'use strict'

/**
 * @fileOverview
 * Less Task
 * Compiles less files
 */

var gulp = require('gulp')
var sass = require('gulp-sass')
var neat = require('node-neat')
var rename = require('gulp-rename')

var handleErrors = require('../util/error-handler')

gulp.task('sass', function () {
  gulp.src('./app/scss/style.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: neat.includePaths
    }))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./app/public'))
    .on('error', handleErrors)
})
