import { getProfile } from '@utils/actions/profiles'
import { createClient } from '@utils/supabase/server'

import TrainerForm from './form'

interface PageProps {}

const Page = async () => {
	const profile = await getProfile()

	return (
		<section className="flex flex-col p-3">
			<TrainerForm {...profile} />
		</section>
	)
}
export default Page
