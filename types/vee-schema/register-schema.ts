import * as Yup from 'yup'

export const RegisterValidationSchema = Yup.object({
     username: Yup.string().label("Username").required().min(5).max(35),
     email: Yup.string().label("Email").required().email(),
     password: Yup.string().label("Password").required().min(8),
     confirmPassword: Yup.string().label("Confirm password").required().min(8),
     firstName: Yup.string().label("First name").required().min(3),
     lastName: Yup.string().label("Last name").required().min(3),
     dateOfBirth: Yup.date().optional(),
})