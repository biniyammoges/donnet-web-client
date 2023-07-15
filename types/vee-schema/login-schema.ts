import * as Yup from 'yup'

export const LoginValidationSchema = Yup.object({
     email: Yup.string().email().required(),
     password: Yup.string().min(8).required(),
})