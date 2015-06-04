'use strict'

import { Store } from 'flummox'
import _ from 'lodash'

class PlaylistStore extends Store {

  constructor(flux) {
    super()

    const playlistActionIds = flux.getActionIds('playlist')

    this.register(playlistActionIds.load, this.handleLoad)

    this.state = { playlist: {}, tracks: [] }
  }

  handleLoad(data) {
    this.setState({
      playlist: _.omit(data, 'tracks'),
      tracks: _.sortByOrder(_.get(data, 'tracks', []), 'createdAt', false),
      trackCount: _.get(data, 'tracks', []).length
    })
  }

  handleUpdate(users) {
    let i = _.findIndex(this.state.users, { id: users[0].id })
    this.setState({ users: [_.merge(this.state.users[i], users[0])] })
  }

}

export default PlaylistStore