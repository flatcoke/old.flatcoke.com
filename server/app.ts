require('dotenv').config()
import * as Hapi from 'hapi'
import * as auth from './api/auth'
import * as user from './api/users'
import { validate } from './auth'
import { plugins } from './config/plugins'
import { sequelize } from './database'

export const port = parseInt(process.env.PORT || '3000', 10)

const NODE_ENV = process.env.NODE_ENV || 'dev'

export const initializeServer = async () => {
  const server = new Hapi.Server({
    host: 'localhost',
    port,
  })
  await user.init(server)
  await auth.init(server)
  await server.register(plugins)
  await sequelize.sync({
    force: NODE_ENV === 'test',
    logging: NODE_ENV === 'dev',
  })
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_KEY || 'NeverShareYourSecret',
    validate: validate, // validate function defined above
    verifyOptions: { algorithms: ['HS256'] }, // pick a strong algorithm
  })

  server.auth.default('jwt')
  return server
}
