import { Server, ServerInjectOptions } from 'hapi'
import { initializeServer } from '../../app'
import { User } from '../../models/User'
import { sequelize } from '../../database'

describe('User', () => {
  let server: Server

  beforeAll(async done => {
    server = await initializeServer()
    done()
  })

  afterAll(async done => {
    await sequelize.close()
    done()
  })

  test('GET users', async done => {
    const request: ServerInjectOptions = {
      url: '/api/v1/users',
      method: 'GET',
      app: {},
    }
    const res = await server.inject(request)
    expect(res.statusCode).toBe(200)
    done()
  })

  test('POST user', async done => {
    const request: ServerInjectOptions = {
      url: '/api/v1/users',
      method: 'POST',
      payload: {
        username: 'test',
        email: 'flatcoke89@gmail.com',
        password: 'qwer1234',
      },
    }

    const beforeCount = await User.count()
    const res = await server.inject(request)
    const afterCount = await User.count()
    expect(res.statusCode).toBe(201)
    expect(beforeCount + 1).toBe(afterCount)
    done()
  })
})
