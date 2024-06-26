import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(0).max(30).required()
})