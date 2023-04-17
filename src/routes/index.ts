import { Router } from 'express'
import authRoute from './auth'
import { errorHandler } from '../middlewares/errorHandler'

const router = Router()


router.use('/auth', authRoute)

router.use(errorHandler);

export default router