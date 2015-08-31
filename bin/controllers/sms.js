
'use strict'

let express = require('express')
let db = require('../models')
let _ = require('lodash')
let twilio = require('twilio')
let q = require('../lib/queue')
let fmt = require('logfmt')

class SmsController {

  constructor() {
    this.root = '/sms'
    this.router = express.Router()
  }

  routes() {
    this.router.post('/', this._post.bind(this))

    return this.router
  }

  _post(req, res) {
    let trackKeys = _.map(_.keys(req.body), _.camelCase)
    let track = _.merge(_.zipObject(trackKeys, _.values(req.body)), {
      title: req.body.Body + ' requested by ' + req.body.From
    })

    let job = q.create('track', track)

    job.attempts(3).ttl(5000)

    job.on('failed attempt', function(err, doneAttempts){
      console.log(`Worker failed to complete job, this is attempt ${doneAttempts} of 3`)

    })

    job.save(function(err) {
      if (!err) {
        fmt.log({
          type: 'info',
          msg: `Track request received, added to Redis queue`
        })
      }

      var resp = new twilio.TwimlResponse()

      res.writeHead(200, { 'Content-Type':'text/xml' })
      res.end(resp.sms(
        `Yum, a new track. We\'ll find it and add it to the playlist. ` +
        `Thanks, and keep the suggestions coming!`
      ).toString())
    })
  }
}

module.exports = new SmsController()