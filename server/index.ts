import * as express from 'express'
import { Request, Response } from 'express'
import * as next from 'next'
import { sequelize } from './sequelize'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: './client', dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  const server = express()
  await sequelize.sync({ force: true })
  server.get('/test', (req: Request, res: Response) => {
    req
    return res.send('aa')
  })

  server.get('*', (req: Request, res: Response) => {
    return handle(req, res)
  })

  server.listen(port, async (err: any) => {
    if (err) throw err
    console.log(`> Ready on ${port}`)
  })
})
