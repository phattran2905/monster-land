import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import MenuBar from "../components/MenuBar"
import Item from "../components/Item"

export default function BackpackPage() {
	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row relative">
				<MenuBar />

				<div className="bg-Flamingo-Pink rounded-md py-2 px-3 absolute right-1/2 top-6">
					<span className="text-white font-bold text-sm">12/50</span>
				</div>

				<div className="m-12 w-full h-100">
					<div className="h-full flex flex-row justify-between items-stretch border-Midnight-Gray border-t-2 border-b-2 border-l-2 rounded-sm">
						<div className="flex flex-row flex-wrap gap-y-10 gap-x-28 bg-Amethyst-Purple">
							<Item />
						</div>

						<div className="">
							<ul className="h-full flex flex-col">
								<li className="h-1/2">
									<Link
										to=":id"
										className="h-full bg-Flamingo-Pink flex flex-row justify-center items-center "
									>
										<span className="block rotate-90 text-white font-bold text-xl uppercase ">
											Mystic
										</span>
									</Link>
								</li>
								<li className="h-1/2 border-t-4 border-white">
									<Link
										to=":id"
										className="h-full bg-Indigo-Blue flex flex-row justify-center items-center"
									>
										<span className="rotate-90 text-white font-bold text-xl uppercase hover:text-Gold-Sand">
											Usable
										</span>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	)
}
