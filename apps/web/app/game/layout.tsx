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
			<div className="flex flex-col justify-between w-full">
				<Header />
				<>{children}</>
				<Footer />
			</div>
		</main>
	)
}

export default Layout
