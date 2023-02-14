import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import MenuBar from "../components/menu/MenuBar"

export default function WorldMap() {
	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row">
				<MenuBar />

				<div className="w-full h-full columns-2 gap-0">
					<div className="h-full bg-background-img-2 bg-no-repeat bg-cover flex flex-row justify-center items-center">
						<Link
							to="./wild-forest"
							className="bg-Flamingo-Pink hover:bg-Midnight-Gray w-96 h-96 rounded-full flex flex-row justify-center items-center transition-colors duration-300 shadow-xl shadow-white hover:border-Flamingo-Pink hover:border-8"
						>
							<span className="text-white text-center font-bold text-6xl">
								Wild Forest
							</span>
						</Link>
					</div>
					<div className="h-full bg-background-img-1 bg-no-repeat bg-cover flex flex-row justify-center items-center">
						<button className="bg-Flamingo-Pink hover:bg-Midnight-Gray w-96 h-96 rounded-full flex flex-row justify-center items-center transition-colors duration-300 shadow-xl shadow-white hover:border-Flamingo-Pink hover:border-8">
							<span className="text-white text-center font-bold text-6xl">
								Protected Areas
							</span>
						</button>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	)
}
