import Footer from '@components/Footer'
import Header from '@components/Header'
import Container from '@components/Container'
import React from 'react'
import Sidebar from '@/components/Sidebar'

interface PageProps {
	children: React.ReactNode
}

const Page = ({ children }: PageProps) => {
	return (
		<Container>
			<div className="w-full flex flex-row items-stretch">
				<Sidebar />
				<div className="flex flex-col w-full">
					<Header />

					{children}

					<div className="mt-auto">
						<Footer />
					</div>
				</div>
			</div>
		</Container>
	)
}

export default Page
