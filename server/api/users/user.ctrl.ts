import * as Boom from 'boom'
import * as Hapi from 'hapi'
import * as Joi from 'joi'
import { nested } from '..'
import { User } from '../../models/User'
import { UserPayload } from './index.d'

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
    method: 'GET',
    path: nested('/users/{id}'),
    options: {
      auth: false,
      description: 'Get user',
      tags: ['api', 'user'],
      validate: {
        params: {
          // prettier-ignore
          id: Joi.number().integer().required()
        },
      },
      handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
        const user: User = await User.findByPk(req.params.id)
        return user
      },
    },
  })

  server.route({
    method: 'DELETE',
    path: nested('/users/{id}'),
    options: {
      description: 'Delete user',
      tags: ['api', 'user'],
      validate: {
        params: {
          // prettier-ignore
          id: Joi.number().integer().required()
        },
      },
      handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
        const user: User = await User.findByPk(req.params.id)
        return user
      },
    },
  })

  server.route({
    method: 'POST',
    path: nested('/users'),
    options: {
      auth: false,
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
      handler: async (req: Hapi.Request, h: Hapi.ResponseToolkit) => {
        try {
          const user: User = await User.createByEmail(
            req.payload as UserPayload,
          )
          return h.response({ ...user.getJWTToken() }).code(201)
        } catch (e) {
          return Boom.badRequest()
        }
      },
    },
  })

  server.route({
    method: 'PUT',
    path: nested('/users/{id}'),
    options: {
      description: 'Update user',
      tags: ['api', 'user'],
      validate: {
        params: {
          // prettier-ignore
          id: Joi.number().integer().required()
        },
        payload: {
          email: Joi.string().email(),
          username: Joi.string(),
        },
      },
      handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
        const user: User = await User.findByPk(req.params.id)
        user.update(req.payload as UserPayload)
        return user
      },
    },
  })
}
