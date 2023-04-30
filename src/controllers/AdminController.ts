import { Request, Response, NextFunction } from "express";
import db from "../models";

class AdminController{
    async read(req: Request, res: Response, next: NextFunction){
        try{
            const admins = await db.Admin.findAll()

            res.json({
                success: true,
                data: admins
            })
        }catch(err){
            return next(err)
        }
    }
}

export default new AdminController()