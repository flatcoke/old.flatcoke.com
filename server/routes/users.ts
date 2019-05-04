import { Router } from 'express'

import { User } from '../models/User'

const users = Router()

users.post('/', async (req, res, next) => {
  try {
    const actor = await User.create(req.body)
    res.status(201).json(actor)
  } catch (e) {
    next(e)
  }
})

users.get('/:id', async (req, res, next) => {
  try {
    const user: User = await User.findByPk(req.params.id)
    res.json(user)
  } catch (e) {
    next(e)
  }
})

export default users
