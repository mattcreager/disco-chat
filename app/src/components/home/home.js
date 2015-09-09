'use strict'

import React from 'react'
import _ from 'lodash'
import Track from './track'

class Home extends React.Component {

  constructor(props, context) {
    super(props)

    this.router = context.router
  }

  componentWillMount() {
    const playlistActions = this.props.flux.getActions('playlist')

    let { key } = this.props.account
    let loadPlaylist = playlistActions.load.bind(playlistActions, key)

    loadPlaylist(); setInterval(loadPlaylist, 5000)
  }

  render() {
    let upNow = _.first(this.props.tracks)
    let upNext = _.slice(this.props.tracks, 1, 2)[0]

    let tracks = _.map(_.take(this.props.tracks, 4), (track) => {
      return <Track
        key={ track.id }
        track={ track }
        upNow={ upNow === track }
        upNext={ upNext === track }
      />
    })

    let { number } = this.props.account

    function formatNumber(n) {
      return `1 (${n.substr(2, 3)}) ${n.substr(5, 3)} - ${n.substr(8,4)}`
    }

    return (
      <div>

        <header>
          <a href="#" className="logo">
            <img src="images/disco-chat-logo.png" alt="Smiley face" align="middle"/>
            <aside>
              <h1><strong>Disco</strong>Chat</h1>
              <p>Your Party Built this Playlist</p>
            </aside>
          </a>
          <div className="sms-number">
            <span><strong>{ formatNumber(number) }</strong></span>
            <h3>Text a track to <strong>&#8613;</strong></h3>
          </div>
        </header>

        <div className="playlist"> { tracks } </div>
      </div>
    )
  }
}

Home.contextTypes = {
    router: React.PropTypes.func.isRequired
}

export default Home