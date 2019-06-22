import * as Hapi from 'hapi'

import Router from './user.ctrl'

export function init(server: Hapi.Server) {
  Router(server)
}
