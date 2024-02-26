import React from 'react'
import logo from '@assets/img/logo/logo-trans-bg.png'
import Footer from '@components/Footer'

interface ErrorPageProps {
	children: React.ReactNode
}

const ErrorPage = ({ children }: ErrorPageProps) => {
	return (
		<div className="container-xl flex flex-row h-screen">
			<div className="basis-2/5 bg-Royal-Blue flex flex-col items-stretch justify-center">
				<div className="w-full h-full flex flex-col justify-start items-center">
					<div className="w-1/3 my-14 mx-auto">
						<img
							className="rounded-full"
							src={logo}
							alt="Monster Land logo"
						/>
					</div>

					{children}
				</div>

				<Footer />
			</div>
			<div className="basis-3/5 bg-Flamingo-Pink bg-background-img-3 bg-no-repeat bg-cover" />
		</div>
	)
}
export default ErrorPage
