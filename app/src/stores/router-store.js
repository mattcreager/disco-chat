'use strict'

import { Store } from 'flummox'
import _ from 'lodash'

class DetailStore extends Store {

  constructor(flux) {
    super()

    const detailActionIds = flux.getActionIds('router')

    this.register(detailActionIds.changeRoute, this.handleChangeRoute)

    this.state = { handler: {}, state: {} }
  }

  handleChangeRoute(data) {
  	let routeCount = data.state.routes.length

    this.setState({ miniSidebar: !_.inRange(routeCount, 0, 3) })
  }

}

export default DetailStore