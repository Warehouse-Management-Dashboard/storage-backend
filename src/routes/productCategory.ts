import { Router } from 'express'
import ProductCategoryController from '../controllers/ProductCategoryController'

const router = Router()

router.route('/create').post(ProductCategoryController.create)

export default router