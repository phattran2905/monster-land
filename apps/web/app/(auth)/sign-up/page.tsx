import Logo from '@components/Logo'

import SignUpForm from './form'

const Page = () => {
	return (
		<div className="sm:w-5/6 md:w-3/4 w-10/12 rounded-xl shadow-lg p-6 flex flex-col gap-y-8 bg-white">
			<div className="flex flex-col gap-y-10">
				<Logo className="mx-auto" />
				<SignUpForm />
			</div>
		</div>
	)
}

export default Page
