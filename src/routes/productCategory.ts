import { Router } from 'express'
import ProductCategoryController from '../controllers/ProductCategoryController'

const router = Router()

router.route('/').get(ProductCategoryController.read)
router.route('/:id').get(ProductCategoryController.readOne)
router.route('/create').post(ProductCategoryController.create)
router.route('/update/:id').put(ProductCategoryController.update)
router.route('/delete/:id').delete(ProductCategoryController.delete)

export default router