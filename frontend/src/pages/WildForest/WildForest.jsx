import { Link } from "react-router-dom"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import MenuBar from "../../components/menu/MenuBar"
import CookieImg from "../../assets/img/item/Cookie.png"
import PikachuImg from "../../assets/img/pokemon/025.png"
import PokeballImg from "../../assets/img/Pokeball.png"

export default function WildForest() {
	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row">
				<MenuBar />

				<div className="w-full h-full bg-background-img-5 bg-no-repeat bg-cover flex flex-row justify-between items-stretch gap-10 p-10">
					<div className="bg-white rounded-xl w-2/6 px-6 py-4 flex flex-col justify-between">
						{/* Items */}
						<div className="m-4">
							<div className="w-full h-24 my-4 border-4 border-Flamingo-Pink rounded-xl flex flex-row justify-around items-center">
								<div className="flex flex-row">
									<img
										className="w-14 h-14"
										src={CookieImg}
										alt="Item Icon"
									/>
									<div className="flex flex-col justify-between ml-4">
										<span className="text-black font-bold text-lg capitalize">
											Cookie
										</span>
										<span className="text-Forest-Green">Capture rate +10%</span>
									</div>
								</div>
								<div>
									<input
										className="w-14 border-black border-2 px-2 py-1 text-Indigo-Blue font-bold text-lg rounded-md"
										type="number"
										value={1}
										min={1}
										step={1}
									/>
									<span className="ml-2 text-black font-bold text-xl">/ 10</span>
								</div>
							</div>

							<div className="w-full h-24 my-4 border-2 border-Indigo-Blue rounded-xl flex flex-row justify-around items-center">
								<div className="flex flex-row">
									<img
										className="w-14 h-14"
										src={CookieImg}
										alt="Item Icon"
									/>
									<div className="flex flex-col justify-between ml-4">
										<span className="text-black font-bold text-lg capitalize">
											Cookie
										</span>
										<span className="text-Forest-Green">Capture rate +10%</span>
									</div>
								</div>
								<div>
									<input
										className="w-14 border-black border-2 px-2 py-1 text-Indigo-Blue font-bold text-lg rounded-md"
										type="number"
										value={0}
										min={1}
										step={1}
									/>
									<span className="ml-2 text-black font-bold text-xl">/ 10</span>
								</div>
							</div>
						</div>

						{/* Button */}
						<div className="flex flex-row justify-end p-4">
							<button className="py-3 px-14 bg-Midnight-Gray text-white font-bold text-xl rounded-full border-2 border-Midnight-Gray hover:bg-white hover:text-Indigo-Blue hover:border-2 hover:border-Indigo-Blue transition-colors duration-200">
								Skip
							</button>
							<button className="py-2 px-14 ml-4 bg-Flamingo-Pink text-white font-bold text-xl rounded-full border-2 border-Flamingo-Pink hover:bg-white hover:text-Indigo-Blue hover:border-2 hover:border-Indigo-Blue transition-colors duration-200">
								Use
							</button>
						</div>
					</div>

					{/* Capture button */}
					<div className="flex flex-row justify-end items-end py-6">
						<button className="opacity-80 px-10 py-6 rounded-full bg-white text-Flamingo-Pink font-bold uppercase text-xl hover:bg-Flamingo-Pink hover:text-white transition-colors duration-200 hover:shadow-lg hover:shadow-Gold-Sand hover:opacity-100">
							<img
								className="w-28 h-28 m-2"
								src={PokeballImg}
								alt="Pokeball"
							/>
							Capture
						</button>
					</div>

					{/* Wild Pokemon */}
					<div className="w-2/6 flex flex-col items-stretch justify-evenly">
						<div className="w-96 bg-white rounded-lg border-2 border-Indigo-Blue px-4 py-6">
							<div className="mx-1 mb-4">
								<span className="text-Indigo-Blue font-bold text-lg mr-6 underline capitalize">
									Level
								</span>
								<span className="font-bold text-Flamingo-Pink text-xl">14</span>
							</div>
							<div className="mx-1 mb-4">
								<span className="text-Indigo-Blue font-bold text-lg mr-6 underline capitalize">
									Type
								</span>
								<span className="bg-Gold-Sand text-black px-2 py-1 font-bold text-md rounded-lg">
									Electric
								</span>
							</div>
							<div className="mx-1 mb-2">
								<div className="mb-4 flex flex-row justify-between items-center">
									<span className="text-Indigo-Blue font-bold text-lg underline capitalize">
										Capture rate
									</span>
									<span className="text-Flamingo-Pink font-bold">60%</span>
								</div>
								<div className="w-full h-4 bg-black rounded-full">
									<div className="h-full w-3/5 bg-Forest-Green rounded-full"></div>
								</div>
							</div>
						</div>
						<div>
							<div className="w-80 h-80 bg-white rounded-full flex flex-col justify-center items-center border-4 border-Indigo-Blue">
								<img
									className="mb-2"
									src={PikachuImg}
									alt="Pokemon image"
								/>
								<span className="text-Flamingo-Pink font-bold text-3xl capitalize">
									Pikachu
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	)
}
