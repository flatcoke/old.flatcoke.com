import { ServerRegisterPluginObject } from 'hapi'

export const plugins: ServerRegisterPluginObject<any>[] = [
  {
    plugin: require('vision'),
  },
  {
    plugin: require('inert'),
  },
  {
    plugin: require('hapi-swagger'),
    options: {
      info: {
        title: 'API Documentation',
        description: 'Description goes here',
        version: '1.0.0',
      },
      securityDefinitions: {
        jwt: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
  },
  {
    plugin: require('hapi-auth-jwt2'),
  },
  {
    plugin: require('bell'),
  },
]
