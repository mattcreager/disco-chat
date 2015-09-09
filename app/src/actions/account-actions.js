'use strict'

import { Actions } from 'flummox'
// import axios from 'axios'
// import axiosInterface from '../lib/axios-interface'

class AccountActions extends Actions {

  constructor() {
    super()
  }

  setCurrentAcct(key, number) {
    localStorage.setItem('userKey', key)
    localStorage.setItem('number', number)

    return {
      key: key,
      number: number
    }
  }

  // load(id) {
  //   return axios.all([
  //     axiosInterface.get('users', (id ? 'users/' + id : 'users')),
  //     axiosInterface.get('addresses', 'users/' + id + '/address')
  //   ]).then(result => {
  //     let users = result[0]
  //     let addresses = result[1]

  //     users[0].addresses = addresses
  //     return users
  //   })
  // }

  // update(id, data) {
  //   return axiosInterface.update('users', data, 'users/' + id)
  // }

}

export default AccountActions