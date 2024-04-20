import Logo from '@components/Logo'

import SignUpForm from './form'

const Page = () => {
	return (
		<div className="flex flex-col gap-y-10">
			<Logo className="mx-auto" />
			<SignUpForm />
		</div>
	)
}

export default Page
