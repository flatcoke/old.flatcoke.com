import * as Hapi from 'hapi'

export default function(server: Hapi.Server) {
  server.route({
    method: 'GET',
    path: '/api/v1/users',
    options: {
      handler: (_req: Hapi.Request, _h: Hapi.ResponseToolkit) => {

        return 'aa'
      },
    },
  })
}
