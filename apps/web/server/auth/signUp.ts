'use server'

import SignUpFormSchema, { SignUpFormSchemaType } from '@schemas/signUp'
import { createClient } from '@utils/supabase/server'
import { revalidatePath } from 'next/cache'
import 'server-only'

export const onSignUp = async (formData: SignUpFormSchemaType) => {
	const result = SignUpFormSchema.safeParse(formData)
	if (!result.success)
		return {
			message: result.error.message,
			status: 'error',
		}

	const { email, password } = result.data
	const supabase = createClient()
	const { data, error } = await supabase.auth.signUp({ email, password })

	if (error) {
		return {
			message: error.message,
			status: 'error',
		}
	}

	revalidatePath('/sign-up')
	return {
		data,
		message: 'Successfully. Please check your email to verify your account.',
		status: 'success',
	}
}
