import { z } from 'zod'

export const TrainerSchema = z.object({
	avatar: z.string(),
	created_at: z.string().datetime({ offset: true }).optional(),
	email: z.string().email(),
	exp: z.number().optional(),
	level_up_exp: z.number().optional(),
	stamina: z.number().optional(),
	uid: z.string().optional(),
	username: z.string(),
})

export type TrainerSchemaType = z.infer<typeof TrainerSchema>
