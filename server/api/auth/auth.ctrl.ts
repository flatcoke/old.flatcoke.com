import * as Hapi from 'hapi'
import { nested } from '.'

export default function(server: Hapi.Server) {
  server.route({
    method: 'POST',
    path: nested('/facebook'),
    options: {
      auth: false,
      description: 'Get user profile by facebook accesstoken',
      tags: ['api', 'auth'],
      validate: {},
      handler: async (_req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
        return 'works'
      },
    },
  })
}
