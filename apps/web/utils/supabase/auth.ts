'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from './server'

const supabase = createClient()

interface userData {
	email: string
	password: string
}

export async function signInWithEmail({ email, password }: userData) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) return { data: null, error }

	revalidatePath('/dashboard', 'layout')
	redirect('/dashboard')
}

export async function logOut() {
	return await supabase.auth.signOut()
}
