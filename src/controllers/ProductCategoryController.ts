import { Request, Response, NextFunction } from "express";
import { productCategorySchema } from "../utils/validators/productCategory";
import { Asserts } from 'yup'
import db from '../models'
import { pagination } from "../utils/pagination";

interface ProductCategoryInput extends Asserts<typeof productCategorySchema>{}

class ProductCategoryController{
    async read(req: Request, res: Response, next: NextFunction){
        try{
            const { limit, offset, currentPage } = pagination(req.query)
            const { count, rows: productCategories } = await db.ProductCategory.findAndCountAll({
                limit,
                offset
            })

            res.json({
                success: true,
                count,
                currentPage,
                data: productCategories
            })
        }catch(err){
            return next(err)
        }
    }

    async readOne(req: Request, res: Response, next: NextFunction){
        try{
            const { id } = req.params

            const productCategory = await db.ProductCategory.findOne({
                where:{
                    id
                }
            })
            if(!productCategory) return next("product category not found")
            
            res.json({
                success: true,
                data: productCategory
            })
        }catch(err){
            return next(err)
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
        try{
            const { name }: ProductCategoryInput = productCategorySchema.validateSync(req.body)
            const admin = req.user

            const createdProductCategory = await db.sequelize.transaction(async (t: any) => {
                const createdProductCategory = await db.ProductCategory.create({
                    name
                }, {
                    transction: t
                })

                await db.AdminLog.create({
                    admin_id: admin.id,
                    action_name: "CREATE",
                    action_description: `admin with id:${admin.id} created a new product category with name"${name}`
                })
                
                return createdProductCategory
            })


            res.json({
                success: true,
                data: createdProductCategory
            })
        }catch(err){
            return next(err)
        }
    }

    async update(req: Request, res: Response, next: NextFunction){
        try{
            const { name }: ProductCategoryInput = productCategorySchema.validateSync(req.body)
            const { id } = req.params
            const admin = req.user

            const productCategory = await db.ProductCategory.findOne({
                where:{
                    id
                }
            })
            if(!productCategory) return next("Product category not found")

            await db.sequelize.transaction(async (t: any) => {
                productCategory.name = name
                await productCategory.save({ transaction: t })

                await db.AdminLog.create({
                    admin_id: admin.id,
                    action_name: "UPDATE",
                    action_descrtiption: `admin with id:${admin.id} updated product category with id:${id}`
                }, {
                    transaction: t
                })
            })

            res.json({
                success: true,
                message: "Item successfully updated"
            })
        }catch(err){
            return next(err)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try{
            const { id } = req.params
            const admin = req.user

            const productCategory = await db.ProductCategory.findOne({
                where:{
                    id
                }
            })
            if(!productCategory) return next("product category not found")

            await db.sequelize.transaction(async (t: any) => {
                await db.ProductCategory.destroy({
                    where:{
                        id
                    },
                    transaction: t
                })

                await db.AdminLog.create({
                    admin_id: admin.id,
                    action_name: 'DELETE',
                    action_description: `admin with id:${admin.id} deleted product category with id:${id}`
                })
            })
        }catch(err){
            return next(err)
        }
    }
}

export default new ProductCategoryController()