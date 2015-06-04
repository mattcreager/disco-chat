'use strict'

import React from 'react'
import { Route, DefaultRoute } from 'react-router'
import App from './app'
import { Home } from './components'

// import config from './config.js'

export default (
  <Route name="home" path="/" handler={App}>  
    <Route name="main" path="main" handler={Home} />

   	<DefaultRoute handler={Home} />
  </Route>
)

  // <Route name="thread" path="thread/:threadId" handler={Panel}>
  //   <Route name="notes" path="notes" handler={Notes} />
  //   <Route name="details" path="details" handler={Details} />
  //   <Route name="expenses" path="expenses" handler={Expenses} />
  //   <Route name="reminders" path="reminders" handler={Reminders} />
  //   <Route name="tasks" path="tasks" handler={Tasks} />
  //   <Route name="task-detail" path="task/:taskId" handler={Tasks} />
  // </Route>
