
'use strict'

let _ = require('lodash')
let q = require('./lib/queue')
let fmt = require('logfmt')
let pg = require('pg')
let config = require('./config')
var setIntrvl = require('intrvl').setIntrvl

var interval = setIntrvl(function(){
    console.log('Checking for new Chatter tune requests')
    pollPg()
}, 10000) // runs indefinitely

interval.on('stop', function(execCount) {
  console.log('Stopped after ' + execCount + ' executions')
})

let totalProcessed = 0

function pollPg() {
  pg.connect(`${process.env.DATABASE_URL}?ssl=true`, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT id, name from salesforce.track__c', function(err, result) {
      done();

      if (err) {
        return console.error('error running query', err);
      }

      if (result.rows.length <= totalProcessed) return

      let newTracks = _.takeRight(result.rows, result.rows.length - totalProcessed)

      _.each(newTracks, function(trk) {
        let track = {}

        track.body = trk.name
        track.from = '+14159360869'
        track.fromCity = 'SAN FRANCISCO'
        track.fromCountry =  'US'
        track.fromState =  'CA'
        track.fromZip =  '94105'
        track.from = 'Chatter'
        track.title = 'Incoming Chatter song Request: ' + trk.name
        track.to = '+14152148408'
        track.toCity = 'SAN FRANCISCO'
        track.toCountry = 'US'
        track.toState = 'CA'
        track.toZip = '94107'

        q.create('track', track).save(function (err) {
          if (!err) {
            fmt.log({
              type: 'info',
              msg: `Woot, we've got a new song req via. Chatter`
            })
          }
        })
      })

      totalProcessed = result.rows.length
    });
  });
}