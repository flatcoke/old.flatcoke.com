require('dotenv').config()
import * as Hapi from 'hapi'
import * as user from './api/users'
import { validate } from './auth'
import { plugins } from './config/plugins'
import { sequelize } from './sequelize'

export const port = parseInt(process.env.PORT || '3000', 10)

export const initializeServer = async () => {
  const server = new Hapi.Server({
    host: 'localhost',
    port,
  })
  await user.init(server)
  await server.register(plugins)
  await sequelize.sync({
    force: process.env.NODE_ENV === 'test' ? true : false,
    logging: process.env.NODE_ENV === 'development',
  })
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_KEY || 'NeverShareYourSecret',
    validate: validate, // validate function defined above
    verifyOptions: { algorithms: ['HS256'] }, // pick a strong algorithm
  })

  server.auth.default('jwt')
  return server
}
