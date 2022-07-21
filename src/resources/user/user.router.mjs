import { Router } from 'express'
import userControllers from './user.controllers.mjs'

const router = Router()

router.route('/test').get((req, res) => {
  res.json({ message: 'posted, updated' })
})

router.route('/').post(userControllers.signup)

router.route('/').post(userControllers.signin)

export default router
