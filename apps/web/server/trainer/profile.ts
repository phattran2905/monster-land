'use server'

import { TrainerSchema, TrainerSchemaType } from '@schemas/profile'
import { createClient } from '@utils/supabase/server'
import { revalidatePath } from 'next/cache'
import 'server-only'

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
		result: { ...profile, email: user?.email },
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
		avatar: profileData.avatar,
		email: profileData.email,
		exp: 0,
		level_up_exp: 1000,
		stamina: 0,
		username: profileData.username,
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

	revalidatePath('/trainer')
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
	const { avatar, email, uid, username } = profileData || {}

	if (email) {
		await supabase.auth.updateUser({
			email,
		})
	}

	const { data, error } = await supabase
		.from('profiles')
		.update({
			avatar,
			username,
		})
		.eq('uid', uid)
		.select()
		.single()

	if (error) {
		return {
			message: error.message,
			status: 'error',
		}
	}

	revalidatePath('/trainer')
	return {
		message: 'Updated profile successfully',
		result: data,
		status: 'success',
	}
}
