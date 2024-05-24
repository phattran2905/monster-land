'use server'

import LoginFormSchema, { LoginFormSchemaType } from '@schemas/login'
import { createClient } from '@utils/supabase/server'
import { revalidatePath } from 'next/cache'
import 'server-only'

export const onLogin = async (formData: LoginFormSchemaType) => {
	const result = LoginFormSchema.safeParse(formData)
	if (!result.success)
		return {
			message: result.error.message,
			status: 'error',
		}

	const { email, password } = result.data
	const supabase = createClient()
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		return {
			message: error.message,
			status: 'error',
		}
	}

	revalidatePath('/dashboard')
	return {
		message: 'Logged in successfully',
		status: 'success',
	}
}
