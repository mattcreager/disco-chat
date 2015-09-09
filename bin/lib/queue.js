
'use strict'

let kue = require('kue')
var fmt = require('logfmt')
let config = require('../config')

let q = kue.createQueue({ redis: config.redis })

q.watchStuckJobs()

q.on('error', function(err) {
  shutdown('Could not connect to Redis, have you created the add-on?')
})

process.once('SIGINT', shutdown)
process.once('SIGTERM', shutdown)

function shutdown(msg) {
  q.shutdown(500, function (err) {
    fmt.log({ type: 'error', msg: err || msg || 'redis client connection closed' })

    process.exit(0)
  })
}

module.exports = q