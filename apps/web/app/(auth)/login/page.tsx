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
		redirect('/')
	}

	return (
		<div className="flex flex-col gap-y-10">
			<Logo className="mx-auto" />

			<LoginForm />
		</div>
	)
}
export default Page
