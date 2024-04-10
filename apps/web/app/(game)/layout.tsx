import Footer from '@components/Footer'
import Header from '@components/Header'
import Sidebar from '@components/Sidebar'

interface LayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<main className="flex flex-row h-screen">
			<Sidebar />
			<div className="flex flex-col justify-between items-stretch w-full">
				<Header />

				<section>{children}</section>

				<Footer />
			</div>
		</main>
	)
}

export default Layout
