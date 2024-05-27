import Footer from '@components/Footer'
import Header from '@components/Header'
import Sidebar from '@components/Sidebar'
import { createClient } from '@utils/supabase/server'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import CreateCharacterPage from './create-character/page'
import Loading from './loading'

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
			<main className="flex flex-col justify-between h-[100dvh]">
				<CreateCharacterPage />
				<Footer />
			</main>
		)
	}

	return (
		<main className="flex flex-row items-stretch h-[100dvh]">
			<Sidebar />
			<div className="flex flex-col justify-between basis-full">
				<Header />
				<Suspense fallback={<Loading />}>{children}</Suspense>
				<Footer />
			</div>
		</main>
	)
}

export default Layout
