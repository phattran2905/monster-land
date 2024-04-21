import { createClient } from '@utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const supabase = createClient()

	// Check if a user's logged in
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (user) {
		await supabase.auth.signOut()
	}

	revalidatePath('/leaderboard', 'layout')
	return NextResponse.redirect(new URL('/login', req.url), {
		status: 302,
	})
}
