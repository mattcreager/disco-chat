'use strict'

import React from 'react'
import FluxComponent from 'flummox/component'
import Home from './home'

class HomeWrapper extends React.Component {
  render() {
    return (
      <FluxComponent connectToStores={['router', 'account', 'playlist']}>
        <Home />
      </FluxComponent>
    )
  }
}

export default HomeWrapper