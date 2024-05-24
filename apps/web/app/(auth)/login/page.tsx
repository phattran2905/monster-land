import Logo from '@components/Logo'
import { createClient } from '@utils/supabase/server'
import { redirect } from 'next/navigation'

import LoginForm from './form'

const Page = async () => {
	const supabase = createClient()
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (session) {
		redirect('/dashboard')
	}

	return (
		<div className="sm:w-5/6 md:w-3/4 w-10/12 rounded-xl shadow-lg p-6 flex flex-col gap-y-8 bg-white">
			<div className="flex flex-col gap-y-10">
				<Logo className="mx-auto" />
				<LoginForm />
			</div>
		</div>
	)
}
export default Page
