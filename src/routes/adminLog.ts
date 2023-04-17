import { Router } from 'express'
import AdminLogController from '../controllers/AdminLogController'

const router = Router()

router.route('/').get(AdminLogController.read)

export default router