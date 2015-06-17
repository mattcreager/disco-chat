
'use strict'

let fmt = require('logfmt')
let path = require('path')
let kue = require('kue')
let moment = require('moment')
let db = require('./models')
let _ = require('lodash')
let request = require('request')
let q = require('./lib/queue')
let config = require('./config')

q.process('track', track)

const validFields = [
  'accountSid',
  'messageSid',
  'smsMessageSid',
  'smsSid',
  'body',
  'from',
  'fromCity',
  'fromCountry',
  'fromState',
  'fromZip',
  'to',
  'toCity',
  'toCountry',
  'toState',
  'toZip',
]

function track(job, done) {

  let rawMessage = _.pick(job.data, validFields)

  db.Message.create(rawMessage).then(function(message) {
    fmt.log({
      type: 'info',
      msg: `SMS processed from ${message.fromCity}, requesting ${message.body}`
    })

    let opts = { where: { number: message.get('to') } }

    return db.Account.findOne(opts).then(function(acct) {
      let expireAt = moment(acct.get('expiresAt'))
      let now = moment()

      if (expireAt.isBefore(now)) {
        fmt.log({
          type: 'warning',
          msg: `Token expired ${expireAt.fromNow()}`
        })

        return
      }

      var opts = {
        auth: { 'bearer': acct.get('accessToken') },
        form: {
          method: 'search',
          types: 'Track',
          query: message.get('body'),
          client_id: config.rdio.clientId
        },
        json: true
      }

      let rdioUri = `${config.rdio.site}/api/1/`

      request.post(rdioUri, opts, function(err, res, body) {
        if (err || res.statusCode ==! 200) {
          fmt.log({
            type: 'error',
            msg: err.message || res.statusCode
          })

          return
        }

        if (!body.result || body.result.track_count === 0) {
          fmt.log({
            type: 'warning',
            msg: 'Rdio search yielded no result',
            messageKey: message.id,
            request: message.body
          })

          done()

          return
        }

        db.Track.upsert(body.result.results[0]).then(function(track) {
          let opts = { where: { key: body.result.results[0].key }}

          return db.Track.findOne(opts)
        }).then(function(track) {
          let opts = { where: { active: true }}

          return acct.getPlaylists(opts).then(function(playlist) {
            fmt.log({
              type: 'info',
              msg: 'Song added to the playlist',
              messageKey: message.id,
              trackKey: track.id
            })

            done()

            track.addMessages([message]).then().catch(function(err) {
              throw new Error(err)
            })

            return playlist[0].addTrack(track)
          })
        }).catch(function(err) {
          throw new Error(err)
        })
      })
    })
  }).catch(function(err) {
    throw new Error(err)
  })
}