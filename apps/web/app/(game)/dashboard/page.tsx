import { createClient } from '@utils/supabase/server'

export default async function DashboardPage(): Promise<JSX.Element> {
	const supabase = createClient()

	console.log(1)
	const {
		data: { session },
	} = await supabase.auth.getSession()

	const {
		data: { user },
	} = await supabase.auth.getUser()
	console.log(session)
	console.log(user)
	if (session) {
		console.log(session)
	}

	return <span>DashboardPage</span>
}
