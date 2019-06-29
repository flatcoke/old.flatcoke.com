import * as next from 'next'
import { initializeServer, port } from './hapi'
import {
  defaultHandlerWrapper,
  nextHandlerWrapper,
  pathWrapper,
} from './next-wrapper'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: './client', dev })

app.prepare().then(async () => {
  const server = await initializeServer()

  server.route({
    method: 'GET',
    options: { auth: false },
    path: '/a',
    handler: pathWrapper(app, '/a'),
  })

  server.route({
    method: 'GET',
    options: { auth: false },
    path: '/b',
    handler: pathWrapper(app, '/b'),
  })

  server.route({
    method: 'GET',
    path: '/_next/{p*}' /* next specific routes */,
    handler: nextHandlerWrapper(app),
  })

  server.route({
    method: 'GET',
    path: '/static/{p*}' /* use next to handle static files */,
    handler: nextHandlerWrapper(app),
  })

  server.route({
    method: 'GET',
    options: { auth: false },
    path: '/{p*}' /* catch all route */,
    handler: defaultHandlerWrapper(app),
  })

  try {
    await server.start()

    console.log(`> Ready on http://localhost:${port}`)
  } catch (error) {
    console.log('Error starting server')
    console.log(error)
  }
})
