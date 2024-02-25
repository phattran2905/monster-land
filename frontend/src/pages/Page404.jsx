import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '@components/Footer'
import code404Img from '../assets/img/error/404.png'
import logo from '../assets/img/logo/logo-trans-bg.png'

export default function Page404() {
	useEffect(() => {
		document.title = 'Monster Land - Page not found'
	}, [])

	return (
		<div className="container-xl flex flex-row h-screen">
			<div className="basis-2/5 bg-Royal-Blue flex flex-col items-stretch justify-between">
				<div className="w-full h-full flex flex-col justify-start items-center">
					<div className="w-1/3 my-14 mx-auto">
						<img
							className="rounded-full"
							src={logo}
							alt="Monster Land logo"
						/>
					</div>

					<div className="flex flex-col justify-center items-center">
						<img
							src={code404Img}
							alt="Code 404 image"
						/>
						<p className="mb-10 text-white font-bold text-center text-6xl capitalize">
							Page not found
						</p>

						<div className="m-12">
							<Link
								to="/home"
								className="h-full w-full py-5 px-10 rounded-full bg-Flamingo-Pink hover:bg-white  text-white text-center font-bold text-xl hover:text-Indigo-Blue transition-colors duration-500"
							>
								Back to Homepage
							</Link>
						</div>
					</div>
				</div>

				<Footer />
			</div>
			<div className="basis-3/5 bg-Flamingo-Pink bg-background-img-3 bg-no-repeat bg-cover"></div>
		</div>
	)
}
