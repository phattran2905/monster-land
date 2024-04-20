import Logo from '@components/Logo'
import { getUser } from '@utils/supabase/user'
import { redirect } from 'next/navigation'

import LoginForm from './form'

const Page = async () => {
	const { data } = await getUser()

	if (data) {
		return redirect('/leaderboard')
	}

	return (
		<div className="flex flex-col gap-y-10">
			<Logo className="mx-auto" />

			<LoginForm />
		</div>
	)
}
export default Page
