import axios from 'axios'
import * as Hapi from 'hapi'
import * as Joi from 'joi'
import { nested } from '.'
import { User } from '../../models/User'
import { FacebookUserData, IAccessToken } from './index.d'

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
      handler: async (_req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
        try {
          const accessToken = _req.payload as IAccessToken
          const result = await axios.get(FACEBOOK_GRAPH_URI, {
            params: { access_token: accessToken.accessToken },
          })
          const [user, isCreated]: [
            User,
            boolean
          ] = await User.findOrCreateByFacebookId(
            result.data as FacebookUserData,
          )
          return _h.response(user).code(isCreated ? 201 : 200)
        } catch (_e) {
          // TODO: to be BOOM error
          return 'error'
        }
      },
    },
  })
}
