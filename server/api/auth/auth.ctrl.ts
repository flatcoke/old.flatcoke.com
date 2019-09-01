import axios from 'axios'
import * as Hapi from 'hapi'
import * as Joi from 'joi'
import * as Boom from 'boom'
import { nested } from '.'
import { User } from '../../models/User'
import {
  FacebookAccessTokenData,
  IAccessToken,
  IRefreshToken,
  JWTToken,
} from './index.d'

const FACEBOOK_GRAPH_URI = 'https://graph.facebook.com/me'

export default function(server: Hapi.Server) {
  server.route({
    method: 'POST',
    path: nested('/facebook'),
    options: {
      auth: false,
      description: 'Get user profile by facebook accesstoken',
      tags: ['api', 'auth'],
      validate: {
        payload: {
          // prettier-ignore
          accessToken: Joi.string().required().token()
        },
      },
      handler: async (req: Hapi.Request, h: Hapi.ResponseToolkit) => {
        try {
          const accessToken = req.payload as IAccessToken
          const result = await axios.get(FACEBOOK_GRAPH_URI, {
            params: { access_token: accessToken.accessToken },
          })
          const [user, isCreated]: [
            User,
            boolean
          ] = await User.findOrCreateByFacebookId(
            result.data as FacebookAccessTokenData,
          )
          // prettier-ignore
          return h.response({ ...user.getJWTToken() }).code(isCreated ? 201 : 200)
        } catch (_e) {
          // TODO: to be BOOM error
          return Boom.badRequest()
        }
      },
    },
  })

  server.route({
    method: 'POST',
    path: nested('/refresh-token'),
    options: {
      auth: false,
      description: 'Get user profile by facebook accesstoken',
      tags: ['api', 'auth'],
      validate: {
        payload: {
          // prettier-ignore
          refreshToken: Joi.string().required()
        },
      },
      handler: async (req: Hapi.Request, h: Hapi.ResponseToolkit) => {
        try {
          // const credentials: IAuthCredentials = req.auth.credentials as IAuthCredentials
          const { refreshToken } = req.payload as IRefreshToken
          const JWTToken: JWTToken = User.generateJWTTokenByRefreshToken(
            refreshToken,
          )
          return h.response({ ...JWTToken }).code(201)
        } catch (e) {
          return Boom.badRequest(e.message)
        }
      },
    },
  })
}
