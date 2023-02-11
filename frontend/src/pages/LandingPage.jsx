import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import pokemonLandLogo from "../assets/img/logo-2x.png"

export default function LandingPage() {
	return (
		<div className="container-xl flex flex-row h-screen">
			<div className="basis-2/5 bg-Indigo-Blue flex flex-col items-stretch justify-between">
				<div className="w-3/5 mt-32 mx-auto">
					<img
						className="rounded-full"
						src={pokemonLandLogo}
						alt="Pokemon Land logo"
					/>
				</div>

				<div className="flex flex-row justify-center">
					<Link
						to="/home"
						className="hover:shadow-2xl hover:shadow-Flamingo-Pink bg-Flamingo-Pink hover:bg-white rounded-full px-32 py-6 text-white hover:text-Flamingo-Pink font-bold text-4xl uppercase duration-1000 transition-colors"
					>
						Play
					</Link>
				</div>

				<Footer />
			</div>
			<div className="basis-3/5 bg-Flamingo-Pink bg-background-img-3 bg-no-repeat bg-cover">
			</div>
		</div>
	)
}
