import { createClient } from '@utils/supabase/server'

export default async function DashboardPage() {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	// if (!user) {
	// 	return redirect('/login')
	// }

	const { data: profiles, error } = await supabase
		.from('profiles')
		.select('*')
		.order('uid', { ascending: true })
	console.log('FETCH: ', profiles, error)

	return (
		<div>
			<p>Dashboard</p>
			<p>[USER]: {JSON.stringify(user)}</p>
			<p>[PROFILE]: {JSON.stringify(profiles)}</p>
		</div>
	)
}
