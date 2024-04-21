import { createClient } from '@utils/supabase/server'

export default async function DashboardPage(): Promise<JSX.Element> {
	const supabase = createClient()

	const {
		data: { session },
	} = await supabase.auth.getSession()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	console.log(user, 'user - dashboard.tsx')
	if (session) {
		console.log(session, 'session - dashboard.tsx')
	}

	return <span>DashboardPage</span>
}
