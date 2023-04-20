import * as yup from 'yup'

export const productSchema = yup.object().shape({
    productName: yup.string().required(),
    productCategoryId: yup.number().required(),
    supplier: yup.string().required(),
    quantity: yup.number().required(),
    orderPrice: yup.number().required(),
    sellPrice: yup.number().required()
})

export const productFilterSchema = yup.object().shape({
    name: yup.string().nullable().default(null),
    sortBy: yup.string().oneOf(["NEWEST", 'OLDEST', "A-Z", "Z-A"]).nullable().default(null),
    productCategoryId: yup.number().nullable().default(null),
    date: yup.date().nullable().default(null)
})

export const sellProduct = yup.object().shape({
    products: yup.array().of(yup.object().shape({
        productId: yup.number().required(),
        quantity: yup.number().required(),
        customer: yup.string().required()
    })).required()
})