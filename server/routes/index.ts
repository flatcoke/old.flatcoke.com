import { Router } from 'express'

import userRouter from './users'

const router = Router()

router.use('/v1/users', userRouter)

export default router
