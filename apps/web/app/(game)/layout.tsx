import Footer from '@components/Footer'
import Header from '@components/Header'
import Sidebar from '@components/Sidebar'
import { createClient } from '@utils/supabase/server'
import { redirect } from 'next/navigation'

import CreateCharacterPage from './create-character/page'

interface LayoutProps {
	children: React.ReactNode
}

const Layout = async ({ children }: LayoutProps) => {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return redirect('/login')
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select()
		.eq('uid', user.id)
		.single()

	if (!profile) {
		return (
			<main className="flex flex-col h-[100vh] justify-between">
				<CreateCharacterPage />
				<Footer />
			</main>
		)
	}

	return (
		<main className="flex flex-row items-stretch h-[100vh]">
			<Sidebar />
			<div className="flex flex-col justify-between basis-full">
				<Header />
				{children}
				<Footer />
			</div>
		</main>
	)
}

export default Layout
