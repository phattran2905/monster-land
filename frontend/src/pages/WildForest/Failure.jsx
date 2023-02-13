import { Link } from "react-router-dom"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import MenuBar from "../../components/MenuBar"
import PikachuImg from "../../assets/img/pokemon/025.png"
import StatusNewImg from "../../assets/img/status-new.png"
import TimesIcon from "../../assets/img/icon/Icon ionic-md-close.png"

export default function Failure() {
	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row">
				<MenuBar />

				<div className="w-full h-full bg-background-img-5 bg-no-repeat bg-cover flex flex-row justify-center">
					<div className="m-10 bg-white rounded-xl w-3/5 flex flex-row shadow-xl shadow-black">
						{/* Left */}
						<div className="w-1/3 bg-Midnight-Gray flex flex-col items-center py-16 px-8 relative">
							<div className="w-72 h-72 mb-10 p-10 border-4 rounded-full border-Midnight-Gray bg-white flex flex-col justify-around items-center shadow-lg shadow-black">
								<img
									src={PikachuImg}
									alt="Pokemon Img"
								/>
								<span className="text-Flamingo-Pink font-bold capitalize text-2xl">
									Pikachu
								</span>
							</div>

							<div className="bg-white w-full p-4 rounded-lg">
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
						</div>

						{/* Right */}
						<div className="w-2/3 bg-white rounded-tr-xl rounded-br-xl px-4 py-6 flex flex-col justify-center items-center">
							<div className="w-60 h-60 bg-Fire-Engine-Red rounded-full flex flex-row justify-center items-center mb-6">
								<img
									src={TimesIcon}
									alt="Check Icon"
								/>
							</div>
							<p className="w-3/4 text-Flamingo-Pink font-bold text-center text-4xl break-words">
								<span className="block mb-1 capitalize">Oh no! It ran away.</span>
								<span className="capitalize">Be prepared next time.</span>
							</p>

							<div className="mt-32">
								<button className="px-8 py-2 bg-Midnight-Gray text-white font-bold text-lg rounded-full">
									Back to Collection
								</button>
								<button className="px-8 py-2 bg-Indigo-Blue text-white font-bold text-lg rounded-full ml-4">
									Find next
								</button>
							</div>
						</div>
					</div>
					<div></div>
				</div>
			</div>

			<Footer />
		</div>
	)
}