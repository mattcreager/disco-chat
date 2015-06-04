'use strict'

import axios from 'axios'

// todo: headers: { Authorization: 'Bearer ' }
const config = {
  host: '/api/'
}

class AxiosInterface {

  constructor() {
    this.reqConfig = { headers: config.headers }
  }

  get(resource, endpoint) {
    let ep = endpoint || resource

    return axios.get(config.host + ep, this.reqConfig).then((res) => {
      return res.data
    })
  }

  update(resource, data, endpoint) {
    let ep = endpoint || resource

    return axios.patch(config.host + ep, data, this.reqConfig).then((res) => {
      return res.data[resource]
    }).catch((err) => {console.log(err)})
  }

  create(resource, data, endpoint) {
    let ep = endpoint || resource

    return axios.post(config.host + ep, data, this.reqConfig).then((res) => {
      return res.data[resource]
    }).catch((err) => {console.log(err)})
  }
}

export default new AxiosInterface()