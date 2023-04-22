import * as yup from 'yup'

export const overviewFilterSchema = yup.object().shape({
    productDateUnit: yup.string().oneOf(["year", "month", "day"]).default("year"),
    financeDateUnit: yup.string().oneOf(["year", "month", "day"]).default("year")
})