
'use strict'

let config = require('../config')
let express = require('express')
let db = require('../models')
let oauth2 = require('simple-oauth2')(config.rdio)
let _ = require('lodash')
let request = require('request')

class AuthController {

  constructor() {
    this.root = '/auth'
    this.router = express.Router()
    this.db = db
    this.authUri = oauth2.authCode.authorizeURL({
      redirect_uri: config.url + '/api/auth/callback',
      response_type: 'token'
    })
  }

  routes() {
    this.router.get('/', this._get.bind(this))
    this.router.get('/callback', this._getCallback.bind(this))

    return this.router
  }

  _get(req, res) {
    res.redirect(this.authUri)
  }

  _getCallback(req, res) {
    var code = req.query.code

    oauth2.authCode.getToken({
      code: code,
      redirect_uri: config.url + '/api/auth/callback'
    }, saveToken)

    function saveToken(error, result) {
      if (error) { console.log('Access Token Error', error.message) }

      var token = oauth2.accessToken.create(result)

      var opts = {
        auth: { 'bearer': token.token.access_token },
        form: { method: 'currentUser', client_id: config.rdio.clientId },
        json: true
      }

      request.post('https://www.rdio.com/api/1/', opts, function (error, response, body) {
        if (!error && response.statusCode == 200) {

          var rawUser = _.merge(body.result, {
            accessToken: token.token.access_token,
            refreshToken: token.token.refresh_token,
            expiresAt: token.token.expires_at,
            tokenType: token.token.token_type,
            number: '+14157669503'
          })

          db.Account.upsert(rawUser)
            .then(function(account) {
              return db.Account.findOne({
                where: { key: rawUser.key },
                include: [{ model: db.Playlist }]
              })

              console.log('woot new account processed to db')
            })
            .then(function(account) {
              if (account.get('Playlists').length > 0) return

              return db.Playlist.create({
                  name: 'First PList',
                  description: 'experimenting with PList',
                  active: true
                })
                .then(function(playlist) {
                  console.log('a playlist', playlist.get('name'))
                  console.log('an account', account.get('key'))
                  return account.addPlaylist(playlist)
                })
                .then(function(result) {
                  console.log('a result', result.get('account'))
                })
            })
            .finally(function() {
              res.redirect(config.url)
            })
            .catch(function(err) {
              console.log('error w. auth', err.stack)
            })
        }
      })
    }
  }

}

module.exports = new AuthController()