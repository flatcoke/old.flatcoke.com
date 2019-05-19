import * as Hapi from 'hapi'
import * as next from 'next'

import * as User from './api/users'
import { plugins } from './config/plugins'
import {
  defaultHandlerWrapper,
  nextHandlerWrapper,
  pathWrapper,
} from './next-wrapper'
import { sequelize } from './sequelize'
import { validate } from './auth'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: './client', dev })
const server = new Hapi.Server({
  host: 'localhost',
  port,
})

app.prepare().then(async () => {
  await sequelize.sync({ force: false })
  await User.init(server)
  await server.register(plugins)
  server.auth.strategy('jwt', 'jwt', {
    key: 'NeverShareYourSecret', // TODO: from env
    validate: validate, // validate function defined above
    verifyOptions: { algorithms: ['HS256'] }, // pick a strong algorithm
  })

  server.auth.default('jwt')

  server.route({
    method: 'GET',
    path: '/a',
    handler: pathWrapper(app, '/a'),
  })

  server.route({
    method: 'GET',
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
