'use strict'

import {
  RouterActions,
  UserActions,
  PlaylistActions,
} from './actions'
import {
  RouterStore,
  UserStore,
  PlaylistStore
} from './stores'
import { Flux } from 'flummox'

class AppFlux extends Flux {

  constructor() {
    super()

    this.createActions('router', RouterActions)
    this.createActions('users', UserActions)
    this.createActions('playlist', PlaylistActions)

    this.createStore('router', RouterStore, this)
    this.createStore('users', UserStore, this)
    this.createStore('playlist', PlaylistStore, this)
  }

}

export default AppFlux