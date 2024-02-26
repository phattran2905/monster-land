import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import code404Img from '../assets/img/error/404.png'
import Layout from '@layouts'

export default function Page404() {
	useEffect(() => {
		document.title = 'Monster Land - Page not found'
	}, [])

	return (
		<Layout type="errorPage">
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
		</Layout>
	)
}
