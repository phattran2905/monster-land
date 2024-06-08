'use server'

import { createClient } from '@utils/supabase/server'
import { revalidatePath } from 'next/cache'
import 'server-only'

export const getBackpack = async () => {
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

	const { data: backpack } = await supabase
		.from('backpacks')
		.select()
		.eq('uid', user?.id)
		.single()
	// const { data: backpackRecords } = await supabase
	// 	.from('backpack_records')
	// 	.select()
	// 	.eq('uid', user?.id)

	// console.log(backpackRecords)

	revalidatePath('/backpacks')

	return {
		message: 'Backpack fetched successfully',
		result: backpack,
		status: 'success',
	}
}
