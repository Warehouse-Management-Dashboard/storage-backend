import { Request, Response, NextFunction } from "express";
import { overviewFilterSchema } from "../utils/validators/overview";
import { Asserts } from 'yup'
import { Op, QueryTypes } from 'sequelize'
import sequelize from 'sequelize'
import db from "../models";
import moment from "moment";

interface OverviewFilterInput extends Asserts<typeof overviewFilterSchema>{}

class OverviewController{
    async read(req: Request, res: Response, next: NextFunction){
        try{
            const { productDateUnit, financeDateUnit }: OverviewFilterInput = overviewFilterSchema.validateSync(req.query)
            const now = moment()

            const productFinance = await db.Product.findAll({
                attributes:[
                    [sequelize.fn('sum', sequelize.col('total_sell_price')), 'total_sell_price'],
                    [sequelize.fn('sum', sequelize.col('total_order_price')), 'total_order_price']
                ]
            })

            const financeReport = await db.sequelize.query(`
                SELECT 
                    CONVERT(SUM(total_sell_price), UNSIGNED) AS total_sell_price,
                    CONVERT(SUM(total_order_price), UNSIGNED) AS total_order_price
                FROM products
                WHERE deleted_at IS NULL AND created_at >= '${now.subtract(1, financeDateUnit).format('YYYY-MM-DD')}'
            `, {
                type: QueryTypes.SELECT,
                logging: console.log
            })


            const finance = await db.FinanceLog.findAll({
                where:{
                    created_at: {[Op.gte]: now.subtract(1, financeDateUnit).format('YYYY-MM-DD')}
                }
            })
            const productReport = await db.sequelize.query(`
                SELECT 
                    CONVERT(SUM(order_amount), UNSIGNED) AS order_amount,
                    CONVERT(SUM(sell_amount), UNSIGNED) AS sell_amount
                FROM product_logs
                WHERE deleted_at IS NULL AND created_at >= '${now.subtract(1, productDateUnit).format('YYYY-MM-DD')}'
            `, {
                type: QueryTypes.SELECT
            })

            res.json({
                success: true,
                data: {
                    cardData: {
                        totalSold: parseInt(productFinance[0].total_sell_price),
                        totalOrdered: parseInt(productFinance[0].total_order_price),
                        profit: parseInt(productFinance[0].total_sell_price) - parseInt(productFinance[0].total_order_price)
                    },
                    financeReport: {
                        totalSold: finance.map((f: any) => f.sell_amount).filter(Boolean),
                        totalOrdered: finance.map((f: any) => f.order_amount).filter(Boolean),
                        profit: finance.map((f: any) => f.profit).filter(Boolean)
                    },
                    productReport: {
                        sold: productReport[0].sell_amount,
                        order: productReport[0].order_amount,
                        total: productReport[0].order_amount - productReport[0].sell_amount
                    }
                }
            })
        }catch(err){
            return next(err)
        }
    }
}

export default new OverviewController()