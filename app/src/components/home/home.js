'use strict'

import React from 'react'
import _ from 'lodash'
import Track from './track'

class Home extends React.Component {

  componentWillMount() {
    const playlistActions = this.props.flux.getActions('playlist')

    playlistActions.load()
    setInterval(playlistActions.load, 5000)
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
            <span><strong>1 (415) 766 9503</strong></span>
            <h3>Text a track to <strong>&#8613;</strong></h3>
          </div>
        </header>

        <div className="playlist"> { tracks } </div>
      </div>
    )
  }
}

export default Home