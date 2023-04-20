import { Request, Response, NextFunction } from "express";
import db from '../models'
import { productFilterSchema, productSchema, sellProduct } from "../utils/validators/product";
import { Asserts } from 'yup'
import { pagination } from "../utils/pagination";
import { Op } from "sequelize";
import moment from 'moment'
import { checkProductStock } from "../utils/checkProductStock";


interface ProductInput extends Asserts<typeof productSchema> {}
interface ProductFilterSchema extends Asserts<typeof productFilterSchema>{}
interface SellProductInput extends Asserts<typeof sellProduct>{}

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

    async readOne(req: Request, res: Response, next: NextFunction){
        try{
            const { id } = req.params

            const product = await db.Product.findOne({
                where:{
                    id
                }
            })
            if(!product) return next("Product not found")

            res.json({
                success: true,
                data: product
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

            const createdProduct = await db.sequelize.transaction(async (t: any) => {
                const createdProduct = await db.Product.create({
                    product_name: productName,
                    product_category_id: productCategoryId,
                    supplier,
                    quantity,
                    sell_price: sellPrice,
                    order_price: orderPrice,
                    total_sell_price: 0,
                    total_order_price: orderPrice * quantity
                }, {
                    transaction: t
                })
    
                await db.AdminLog.create({
                    admin_id: admin.id,
                    action_name: "CREATE",
                    action_description: `admin with id:${admin.id} ordered item with name:${productName} with a quantity of ${quantity}`
                }, {
                    transaction: t
                })

                return createdProduct
            })


            res.json({
                success: true,
                data: createdProduct
            })
        }catch(err){
            return next(err)
        }
    }

    async update(req: Request, res: Response, next: NextFunction){
        try{
            const {
                productName,
                productCategoryId,
                supplier,
                quantity,
                sellPrice,
                orderPrice
            }: ProductInput = productSchema.validateSync(req.body)

            const { id } = req.params

            const admin = req.user

            const product = await db.Product.findOne({
                where:{
                    id
                }
            })
            if(!product) return next("product not found")

            const productCategory = await db.ProductCategory.findOne({
                where:{
                    id: productCategoryId
                }
            })
            if(!productCategory) return next("Product category not found")

            await db.sequelize.transaction(async (t: any) => {
                product.product_name = productName
                product.product_category_id = productCategoryId
                product.product_supplier = supplier
                product.product_quantity = quantity
                product.product_sell_price = sellPrice
                product.order_price = orderPrice

                await product.save({ transaction: t })

                await db.AdminLog.create({
                    admin_id: admin.id,
                    action_name: "UPDATE",
                    action_description: `admin with id${admin.id} updated product with id:${id}`
                }, {
                    transaction: t
                })
            })

            res.json({
                success: true,
                data: product
            })
        }catch(err){
            return next(err)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try{
            const { id } = req.params
            const admin = req.user

            const product = await db.Product.findOne({
                where:{
                    id
                }
            })
            if(!product) return next("Product not found")

            await db.sequelize.transaction(async (t: any) => {
                await db.Product.destroy({
                    where:{
                        id
                    },
                    transaction: t
                })

                await db.AdminLog.create({
                    admin_id: admin.id,
                    action_name: "DELETE",
                    action_description: `admin with id:${admin.id} deleted product with id:${id}`
                })
            })

            res.json({
                success: true,
                message: "Item successfullt deleted"
            })
        }catch(err){
            return next(err)
        }
    }

    async sell(req: Request, res: Response, next: NextFunction){
        try{
            const { products }: SellProductInput = sellProduct.validateSync(req.body)

            const admin = req.user

            await db.sequelize.transaction(async (t: any) => {
                for(const p of products){
                    const product = await db.Product.findOne({
                        where:{
                            id: p.productId
                        }
                    })
    
                    if(!product) return next(`Product not found with id:${p.productId}`)
                    if(!checkProductStock(product.quantity, p.quantity)) return next(`Insufficient stock for product with id:${p.productId}`)
    
                    const newProductStock = product.quantity - p.quantity
                    const sellPrice = product.sell_price
                    const totalSellPrice = product.total_sell_price
                    product.quantity = newProductStock
                    product.total_sell_price = totalSellPrice + (p.quantity * sellPrice)
                    await product.save({ transaction: t })
                }
                await db.AdminLog.create({
                    admin_id: admin.id,
                    action_name: "CREATE",
                    action_description: `admin with id:${admin.id} sold products with ids:[${products.map((p: any) => p.productId)}]`
                }, {
                    transaction: t
                })
            })

            

            res.json({
                success: true,
                message: "All products sold successfully"
            })
        }catch(err){
            return next(err)
        }
    }
}

export default new ProductController()