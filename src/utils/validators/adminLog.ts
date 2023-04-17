import * as yup from 'yup'

export const adminLogFilterSchema = yup.object().shape({
    adminId: yup.number().nullable().default(null),
    action: yup.string().oneOf(["CREATE", "UPDATE", 'DELETE']).nullable().default(null),
    date: yup.date().nullable().default(null)
})