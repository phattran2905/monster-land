import { z } from 'zod'

const LoginFormSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	remember: z.boolean(),
})

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>

export default LoginFormSchema
