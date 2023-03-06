import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import logo from "../assets/img/logo/logo-trans-bg.png"

export default function LandingPage() {
	return (
		<div className="container-xl flex flex-row h-screen">
			<div className="basis-2/5 bg-Royal-Blue flex flex-col items-stretch justify-between">
				<div>
					<div className="w-3/4 mt-32 mb-20 mx-auto">
						<img
							className="rounded-full"
							src={logo}
							alt="Monster Land logo"
						/>
					</div>

					<div className="flex flex-row justify-center">
						<Link
							to="/home"
							className="border-4 border-y-Flamingo-Pink bg-Flamingo-Pink hover:bg-white rounded-full px-32 py-6 text-white hover:text-Flamingo-Pink font-bold text-4xl uppercase hover:underline duration-1000 transition-colors"
						>
							Play
						</Link>
					</div>
				</div>

				<Footer />
			</div>
			<div className="basis-3/5 bg-Flamingo-Pink bg-background-img-3 bg-no-repeat bg-cover"></div>
		</div>
	)
}
