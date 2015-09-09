'use strict'

import { Store } from 'flummox'
import _ from 'lodash'

class AccountStore extends Store {

  constructor(flux) {
    super()

    const actionIds = flux.getActionIds('account')

    this.register(actionIds.setCurrentAcct, this.handleSetAcct)

    this.state = { account: {} }
  }

  handleSetAcct(acct) {
    this.setState({ account: acct })
  }

}

export default AccountStore