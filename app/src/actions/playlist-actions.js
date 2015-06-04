'use strict'

import { Actions } from 'flummox'
import axiosInterface from '../lib/axios-interface'

class PlaylistActions extends Actions {

  constructor() {
    super()
  }

  load(key) {
    return axiosInterface.get('playlist', 'playlist/s7509896')
  }

}

export default PlaylistActions