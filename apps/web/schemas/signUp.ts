import { z } from 'zod'

const SignUpFormSchema = z
	.object({
		confirmPassword: z.string(),
		email: z.string().email(),
		password: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'], // path of error
	})

export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>

export default SignUpFormSchema
