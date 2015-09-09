'use strict'

import {
  AccountActions,
  RouterActions,
  PlaylistActions
} from './actions'
import {
  AccountStore,
  RouterStore,
  PlaylistStore
} from './stores'
import { Flux } from 'flummox'

class AppFlux extends Flux {

  constructor() {
    super()

    this.createActions('account', AccountActions)
    this.createActions('router', RouterActions)
    this.createActions('playlist', PlaylistActions)

    this.createStore('account', AccountStore, this)
    this.createStore('router', RouterStore, this)
    this.createStore('playlist', PlaylistStore, this)
  }

}

export default AppFlux