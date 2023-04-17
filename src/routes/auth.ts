import { Router } from 'express'
import AuthController from '../controllers/authController'
import { verifyToken } from '../middlewares/verifyToken'

const router = Router()

router.route('/login').post(AuthController.login)
router.use(verifyToken)
router.route('/').get(AuthController.me)

export default router