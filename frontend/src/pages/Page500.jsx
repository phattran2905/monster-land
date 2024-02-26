import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import code500Img from '../assets/img/error/500.png'
import Layout from '@layouts'

export default function Page500() {
	useEffect(() => {
		document.title = 'Monster Land - Internal Server Error'
	}, [])

	return (
		<Layout type="errorPage">
			<div className="flex flex-col justify-center items-center">
				<img
					src={code500Img}
					alt="Code 500 image"
				/>
				<p className="mb-10 text-white font-bold text-center text-6xl capitalize">
					Internal Server Error
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
