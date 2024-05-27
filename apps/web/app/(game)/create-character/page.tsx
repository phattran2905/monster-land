import Loading from '@components/Loading'
import { createClient } from '@utils/supabase/server'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import CreateCharacterForm from './form'

const CreateCharacterPage = async () => {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	const { data: profile } = await supabase
		.from('profiles')
		.select()
		.eq('uid', user?.id)
		.single()

	if (user && profile) return redirect('/dashboard')

	return (
		<div className="w-full h-full flex flex-col justify-center">
			<div className="max-w-5xl mx-auto my-20 flex flex-row">
				<Suspense fallback={<Loading type="circle" />}>
					<CreateCharacterForm
						email={user?.email}
						uid={user?.id}
					/>
				</Suspense>
			</div>
		</div>
	)
}
export default CreateCharacterPage
