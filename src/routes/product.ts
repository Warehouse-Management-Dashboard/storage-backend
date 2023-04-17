import { Router } from 'express'
import ProductController from '../controllers/ProductController'

const router = Router()

router.route('/').get(ProductController.read)
router.route('/create').post(ProductController.create)

export default router