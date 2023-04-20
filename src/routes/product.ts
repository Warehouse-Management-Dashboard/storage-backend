import { Router } from 'express'
import ProductController from '../controllers/ProductController'

const router = Router()

router.route('/').get(ProductController.read)
router.route('/:id').get(ProductController.readOne)
router.route('/create').post(ProductController.create)
router.route('/update/:id').put(ProductController.update)
router.route('delete/:id').delete(ProductController.delete)
router.route('/sell').post(ProductController.sell)

export default router