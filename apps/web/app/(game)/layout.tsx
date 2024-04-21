import Footer from '@components/Footer'
import Header from '@components/Header'
import Sidebar from '@components/Sidebar'
import { createClient } from '@utils/supabase/server'
import { redirect } from 'next/navigation'

interface LayoutProps {
	children: React.ReactNode
}

const Layout = async ({ children }: LayoutProps) => {
	const supabase = createClient()
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/login')
	}

	return (
		<main className="flex flex-row items-stretch h-full min-h-screen">
			<Sidebar />
			<div className="flex flex-col justify-between items-stretch basis-full">
				<Header />

				<>
					{children}
					<Footer />
				</>
			</div>
		</main>
	)
}

export default Layout
