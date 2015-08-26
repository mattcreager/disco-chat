
'use strict'

let kue = require('kue')
var fmt = require('logfmt')
let config = require('../config')

let q = kue.createQueue({ redis: config.redis })

q.watchStuckJobs()

q.on('error', function(err) {
  console.log( 'Oops...', err.stack )
})

process.once('SIGINT', function() {
  q.shutdown(500, function(err) {
    fmt.log({ type: 'info', msg: err || 'redis client connection closed' })

    process.exit(0)
  })
})

process.once('SIGTERM', function() {
  q.shutdown(500, function(err) {
    fmt.log({ type: 'info', msg: err || 'redis client connection closed' })

    process.exit(0)
  })
})

module.exports = q