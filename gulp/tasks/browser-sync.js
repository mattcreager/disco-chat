'use strict'

/**
 * @fileOverview
 * Browser Sync Task
 * Live-reload & cross-device synchronization
 */

var browserSync = require('browser-sync')
var gulp = require('gulp')

gulp.task('browserSync', ['build'], function () {
  browserSync({
    files: [
      './app/public/*.html',
      './app/public/bundle.css',
      './app/public/bundle.js'
    ],
    proxy: 'localhost:5000/'
  })
})
