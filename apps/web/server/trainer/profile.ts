'use server'

import { createClient } from '@utils/supabase/server'
import { revalidatePath } from 'next/cache'
import 'server-only'
import { z } from 'zod'

const TrainerSchema = z.object({
	avatar: z.string(),
	createdAt: z.string().datetime(),
	email: z.string().email(),
	exp: z.number(),
	levelUpExp: z.number(),
	uid: z.string(),
	username: z.string(),
})

type TrainerSchemaType = z.infer<typeof TrainerSchema>

export const getProfile = async () => {
	const supabase = createClient()
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser()

	if (error) {
		return {
			message: error.message,
			status: 'error',
		}
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select()
		.eq('uid', user?.id)
		.single()

	revalidatePath('/trainer')

	return {
		message: 'Profile fetched successfully',
		result: { ...profile, createdAt: user?.created_at, email: user?.email },
		status: 'success',
	}
}

export const createProfile = async (profileData: TrainerSchemaType) => {
	const result = TrainerSchema.safeParse(profileData)
	if (!result.success)
		return {
			message: result.error.message,
			status: 'error',
		}

	const supabase = createClient()
	const profile = {
		...profileData,
		level_up_exp: 1000,
		stamina: 0,
	}

	const { data, error } = await supabase
		.from('profiles')
		.insert(profile)
		.select()
		.single()

	if (error) {
		return {
			message: error.message,
			status: 'error',
		}
	}

	revalidatePath('/dashboard')
	return {
		message: 'Created profile successfully',
		result: data,
		status: 'success',
	}
}

export const updateProfile = async (profileData: TrainerSchemaType) => {
	if (!profileData.uid)
		return {
			message: 'Invalid UID',
			status: 'error',
		}

	const result = TrainerSchema.safeParse(profileData)
	if (!result.success)
		return {
			message: result.error.message,
			status: 'error',
		}

	const supabase = createClient()
	const { email, uid, ...restProfileData } = profileData || {}

	if (email) {
		await supabase.auth.updateUser({
			email,
		})
	}

	const { data, error } = await supabase
		.from('profiles')
		.update(restProfileData)
		.eq('uid', uid)
		.select()
		.single()

	if (error) {
		return {
			message: error.message,
			status: 'error',
		}
	}

	revalidatePath('/dashboard')
	return {
		message: 'Created profile successfully',
		result: data,
		status: 'success',
	}
}
