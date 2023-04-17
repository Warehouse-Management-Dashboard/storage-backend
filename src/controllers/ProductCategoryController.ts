import { Request, Response, NextFunction } from "express";
import { productCategorySchema } from "../utils/validators/productCategory";
import { Asserts } from 'yup'
import db from '../models'

interface ProductCategoryInput extends Asserts<typeof productCategorySchema>{}

class ProductCategoryController{
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const { name }: ProductCategoryInput = productCategorySchema.validateSync(req.body)

            const createdProductCategory = await db.ProductCategory.create({
                name
            })

            res.json({
                success: true,
                data: createdProductCategory
            })
        }catch(err){
            return next(err)
        }
    }
}

export default new ProductCategoryController()