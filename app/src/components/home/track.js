'use strict'

import React from 'react'
import Router from 'react-router'
import classNames from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import numeral from 'numeral'

class Track extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { track, upNow, upNext } = this.props
    console.log(track.name, upNow, upNext)
    return (
      <article className="track-wrapper">
        <div className="track">
          <img className="cover-art" src={ track.icon400 } />
          <div className="details">
            <div className="name">{ track.name }</div>
            <div className="album">{ track.album }</div>
            <div className="artist">{ track.artist }</div>
          </div>
        </div>
        <aside>
          <div>Now Playing</div>
          {/*  <div>5 Likes</div> */}
        </aside>
      </article>
    )
  }
}

export default Track