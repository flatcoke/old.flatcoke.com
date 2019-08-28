import * as Hapi from 'hapi'

import Router from './auth.ctrl'

export const nested = (url: string): string => {
  return `/api/auth${url}`
}

export function init(server: Hapi.Server) {
  Router(server)
}
