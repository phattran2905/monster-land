'use server'

import { Profile } from '@type/profile'
import { createClient } from '@utils/supabase/server'
import { revalidatePath } from 'next/cache'

export const getProfile = async () => {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) return null

	const { data: profile } = await supabase
		.from('profiles')
		.select()
		.eq('uid', user?.id)
		.single()

	revalidatePath('/trainer', 'page')

	return { ...profile, createdAt: user?.created_at, email: user?.email }
}

export const createProfile = async (profileData: Partial<Profile>) => {
	if (!profileData) return null

	const supabase = createClient()
	const profile = {
		...profileData,
		level_up_exp: 1000,
		stamina: 0,
	}

	return supabase.from('profiles').insert(profile).select().single()
}

export const updateProfile = async (
	profileData: Partial<Profile>,
	uid: string | undefined
) => {
	if (!profileData || !uid) return null

	const supabase = createClient()
	const { email, ...restProfileData } = profileData || {}

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

	return { data, error }
}
