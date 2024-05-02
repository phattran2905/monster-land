import { createClient } from '@utils/supabase/server'
import { redirect } from 'next/navigation'

import CreateCharacterForm from './form'

interface Props {}
const CreateCharacterPage = async ({}: Props) => {
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
			<div className="max-w-5xl mx-auto my-20 flex flex-row border-2 border-Indigo-Blue rounded-md relative shadow-xl">
				<CreateCharacterForm uid={user?.id} />
			</div>
		</div>
	)
}
export default CreateCharacterPage
