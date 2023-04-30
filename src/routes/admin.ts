import { Router } from "express";
import AdminController from "../controllers/AdminController";

const router = Router()

router.route('/').get(AdminController.read)

export default router