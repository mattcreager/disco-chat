'use strict'

var fs = require('fs')

fs
  .readdirSync(__dirname).filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    exports[file.split('.')[0]] = require('./' + file)
  })