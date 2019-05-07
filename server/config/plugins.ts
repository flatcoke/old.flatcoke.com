import { ServerRegisterPluginObject } from 'hapi'
import * as inert from 'inert'
import * as vision from 'vision'

export const plugins: ServerRegisterPluginObject<any>[] = [
  {
    plugin: vision,
  },
  {
    plugin: inert,
  },
  {
    plugin: require('hapi-swagger'),
    options: {
      info: {
        title: 'API Documentation',
        description: 'Description goes here',
        version: '1.0.0',
      },
    },
  },
]
