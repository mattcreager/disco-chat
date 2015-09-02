
'use strict'

let express = require('express')
let db = require('../models')
let _ = require('lodash')

class PlaylistController {

  constructor() {
    this.root = '/playlist'
    this.router = express.Router()
    this.db = db
  }

  routes() {
    this.router.get('/:accountKey', this._getActivePlaylist.bind(this))
    this.router.get('/', this._get.bind(this))

    return this.router
  }

  _get(req, res) {
    res.send('hello world')
  }

  _getActivePlaylist(req, res) {

    let opts = {
      where: { key: req.params.accountKey },
      include: [{
        model: this.db.Playlist,
        where: { active: true },
        include: [{ model: this.db.Track }]
      }]
    }

    this.db.Account.findOne(opts).call('toJSON').then(function(account) {
      let playlist = account.Playlists[0]

      playlist.tracks = _.reduce(playlist.Tracks, function(m, t) {
        m.push(_.omit(t, _.isNull))

        delete t.PlaylistTracks
        return m
      }, [])

      delete playlist.Tracks

      res.json(playlist)
    }).catch(function(err) {
      res.status(204).end();
    })
  }

}

module.exports = new PlaylistController()