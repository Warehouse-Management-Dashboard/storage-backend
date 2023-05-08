import { Request, Response, NextFunction } from "express";
import db from '../models'
import { pagination } from "../utils/pagination";
import { adminLogFilterSchema } from "../utils/validators/adminLog";
import { Asserts } from 'yup'
import { Op } from 'sequelize'
import moment from 'moment'

interface AdminLogFilter extends Asserts<typeof adminLogFilterSchema>{}


class AdminLogController{
    async read(req: Request, res: Response, next: NextFunction){
        try{
            const { limit, offset, currentPage } = pagination(req.query)
            const {
                adminId,
                action,
                date
            }: AdminLogFilter = adminLogFilterSchema.validateSync(req.query)

            const { count, rows: adminLogs} = await db.AdminLog.findAndCountAll({
                limit,
                offset,
                where:{
                    ...(adminId && {
                        admin_id: adminId
                    }),
                    ...(action && {
                        action_name: action
                    }),
                    ...(date && {
                        created_at: {[Op.between]: [moment(date).startOf('day'), moment(date).endOf('day')]}
                    })
                },
                include:[
                    {
                        as: 'admin',
                        model: db.Admin
                    }
                ],
                order: [['created_at', 'DESC']]
            })

            res.json({
                success: true,
                currentPage,
                count,
                data: adminLogs
            })
            
        }catch(err){
            return next(err)
        }
    }
}

export default new AdminLogController()