import * as Yup from 'yup'

export const UpdateMeValidationSchema = Yup.object({
     firstName: Yup.string().label("First name").required().min(3),
     lastName: Yup.string().label("Last name").required().min(3),
     email: Yup.string().label("Email").required().email(),
     birthDate: Yup.date().optional(),
     username: Yup.string().label("Username").required().min(5).max(35),
     password: Yup.string().label("Confirm password").required().min(8),
     bio: Yup.string().label("Bio").optional().min(10).max(60)
})