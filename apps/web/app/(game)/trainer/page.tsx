import Loading from '@components/Loading'
import { getProfile } from '@server/trainer/profile'
import { Suspense } from 'react'

import TrainerForm from './form'

const Page = async () => {
	const { message, result: profile, status } = await getProfile()

	return (
		<section className="m-16">
			<Suspense fallback={<Loading type="circle" />}>
				{status === 'error' ? (
					<div className="text-muted">{message}</div>
				) : (
					<TrainerForm {...profile} />
				)}
			</Suspense>
		</section>
	)
}
export default Page
