import * as Hapi from 'hapi'
import * as Joi from 'joi'

import { nested } from '..'
import { User } from '../../models/User'

export default function(server: Hapi.Server) {
  server.route({
    method: 'GET',
    path: nested('/users'),
    options: {
      description: 'Get users',
      tags: ['api', 'user'],
      validate: {},
      handler: async (_req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
        const users: User[] = await User.findAll()
        return users
      },
    },
  })

  server.route({
    method: 'POST',
    path: nested('/users'),
    options: {
      description: 'Create a user',
      tags: ['api', 'user'],
      validate: {
        payload: {
          // prettier-ignore
          email: Joi.string().email().required(),
          username: Joi.string().required(),
          password: Joi.string().required(),
        },
      },
      handler: async (_request: Hapi.Request, _h: Hapi.ResponseToolkit) => {
        try {
          const { username, email, password }: any = _request.payload
          const user: User = await User.create({
            username,
            email,
            password,
            provider: 'email',
            uid: email,
          })
          return user
        } catch (e) {
          console.log(e)
          return e
        }
      },
    },
  })
}
