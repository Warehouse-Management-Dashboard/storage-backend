import { Router } from 'express'
import AuthController from '../controllers/authController'

const router = Router()

router.route('/auth/login').post(AuthController.login)

export default router