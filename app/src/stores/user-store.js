'use strict'

import { Store } from 'flummox'
import _ from 'lodash'

class UserStore extends Store {

  constructor(flux) {
    super()

    const expenseActionIds = flux.getActionIds('users')

    this.register(expenseActionIds.load, this.handleLoad)
    this.register(expenseActionIds.update, this.handleUpdate)

    this.state = { users: [] }
  }

  handleLoad(data) {
    this.setState({ users: data })
  }

  handleUpdate(users) {
    let i = _.findIndex(this.state.users, { id: users[0].id })
    this.setState({ users: [_.merge(this.state.users[i], users[0])] })
  }

}

export default UserStore