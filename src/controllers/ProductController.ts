import { Request, Response, NextFunction } from "express";
import db from '../models'
import { productFilterSchema, productSchema } from "../utils/validators/product";
import { Asserts } from 'yup'
import { pagination } from "../utils/pagination";
import { Op } from "sequelize";
import moment from 'moment'


interface ProductInput extends Asserts<typeof productSchema> {}
interface ProductFilterSchema extends Asserts<typeof productFilterSchema>{}

class ProductController{
    async read(req: Request, res: Response, next: NextFunction){
        try{
            const { limit, offset, currentPage } = pagination(req.query)
            const {
                name,
                sortBy,
                productCategoryId,
                date
            }: ProductFilterSchema = productFilterSchema.validateSync(req.query)

            const { count, rows: products} = await db.Product.findAndCountAll({
                limit,
                offset,
                where:{
                    ...(productCategoryId && {
                        product_category_id: productCategoryId
                    }),
                    ...(name && {
                        product_name: {[Op.like]: `%${name}%`}
                    }),
                    ...(date && {
                        created_at: {[Op.between]: [moment(date).startOf('day'), moment(date).endOf('day')]}
                    })
                },
                include:[
                    {
                        as: 'product_category',
                        model: db.ProductCategory,
                    }
                ],
                ...(sortBy && {
                    order:[
                        [
                            ["NEWEST", "OLDEST"].includes(sortBy) ? 'created_at' : 'product_name',
                            ["NEWEST", "Z-A"].includes(sortBy) ? 'DESC' : 'ASC'
                        ]
                    ]
                })
            })

            res.json({
                success: true,
                count,
                currentPage,
                data: products
            })
        }catch(err){
            return next(err)
        }
    }
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const {
                productName,
                productCategoryId,
                supplier,
                quantity,
                sellPrice,
                orderPrice
            }: ProductInput = productSchema.validateSync(req.body)

            const admin = req.user

            const productCategory = await db.ProductCategory.findOne({
                where:{
                    id: productCategoryId
                }
            })
            if(!productCategory) return next("Product category not found")

            const createdProduct = await db.Product.create({
                product_name: productName,
                product_category_id: productCategoryId,
                supplier,
                quantity,
                sell_price: sellPrice,
                order_price: orderPrice,
                total_sell_price: 0,
                total_order_price: 0
            })

            await db.AdminLog.create({
                admin_id: admin.id,
                action_name: "CREATE",
                action_description: `admin with id:${admin.id} ordered item with name:${productName} with a quantity of ${quantity}`
            })

            res.json({
                success: true,
                data: createdProduct
            })
        }catch(err){
            return next(err)
        }
    }
}

export default new ProductController()