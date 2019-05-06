import * as Hapi from 'hapi'

import Router from './routes'

export function init(server: Hapi.Server) {
  Router(server)
}
