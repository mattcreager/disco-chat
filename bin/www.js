
'use strict'

var fmt = require('logfmt')
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var kue = require('kue')
var _ = require('lodash')
var controllers = require('./controllers')
var config = require('./config')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', express.static(path.resolve(__dirname, '..', 'app/public')))

_.each(controllers, function(controller) {
  app.use('/api' + controller.root, controller.routes())
})

app.listen(config.server.port)

fmt.log({ type: 'info', msg: 'Express running on port: ' + config.server.port })

if (config.env === 'development') {
  kue.app.listen(5555)

  fmt.log({ type: 'info', msg: 'Dev detected, Kue running on port: 5555' })
}