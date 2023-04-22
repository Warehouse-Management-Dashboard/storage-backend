import Router from 'express'
import OverviewController from '../controllers/OverviewController'

const router = Router()

router.route('/').get(OverviewController.read)

export default router