'use strict'

import { Actions } from 'flummox'
import axios from '../lib/axios-interface'

class NoteActions extends Actions {

  changeRoute(Handler, state) {
    return { Handler: Handler, state: state }
  }

}

export default NoteActions