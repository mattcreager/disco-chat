'use strict'

import React from 'react'
import { Route, DefaultRoute } from 'react-router'
import App from './app'
import { Home } from './components'

// import config from './config.js'

export default (
  <Route name="home" path="/" handler={App}>
    <Route name="main" path="main" handler={Home} />
    <Route name="auth" path="auth/:userKey" handler={Home} />

   	<DefaultRoute handler={Home} />
  </Route>
)
