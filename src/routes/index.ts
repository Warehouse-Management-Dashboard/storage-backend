import { Router } from 'express'
import authRoute from './auth'
import productCategoryRoute from './productCategory'
import productRoute from './product'
import adminLogsRoute from './adminLog'
import overviewRoute from './overview'
import adminRoute from './admin'
import { errorHandler } from '../middlewares/errorHandler'
import { verifyToken } from '../middlewares/verifyToken'

const router = Router()

router.use('/auth', authRoute)
router.use(verifyToken)
router.use('/product-category', productCategoryRoute)
router.use('/product', productRoute)
router.use('/admin-logs', adminLogsRoute)
router.use('/overview', overviewRoute)
router.use('/admin', adminRoute)

router.use(errorHandler);

export default router