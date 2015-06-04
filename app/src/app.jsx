'use strict'

import React from 'react/addons'
import FluxComponent from 'flummox/component'
import { RouteHandler } from 'react-router'


class App extends React.Component {
  render () {
    return (
      <div className='main container'>
        <RouteHandler />
      </div>
    )
  }
}

module.exports = App  
