import Footer from "../components/Footer"
import logo from "../assets/img/logo/logo-trans-bg.png"
import { FaFemale, FaMale, FaAngleLeft, FaAngleRight, FaExclamationCircle } from "react-icons/fa"
import Male1Image from "../assets/img/trainer/male-1.png"

function CharacterCreationPage() {
	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<div className="w-full h-full px-32 py-16 flex justify-center items-start ">
				<div className="w-3/4 flex flex-row justify-start items-start border-2 border-Indigo-Blue rounded-md relative">
					<div className="w-1/2 h-full p-10 bg-Indigo-Blue flex flex-col items-center">
						<h2 className="py-2 text-4xl font-bold text-Gold-Sand border-b-4 border-Gold-Sand inline-block">
							Choose Your Avatar
						</h2>

						<div className="character">
							<div className="flex flex-row justify-center items-center">
								<button>
									<FaAngleLeft className="text-4xl text-white hover:text-Flamingo-Pink" />
								</button>
								<div className="bg-white w-80 py-10 rounded-3xl mt-10 m-4">
									<img
										className="w-1/2 mx-auto"
										src={Male1Image}
										alt="Male 1 image"
									/>
								</div>
								<button>
									<FaAngleRight className="text-4xl text-white hover:text-Flamingo-Pink" />
								</button>
							</div>

							<div className="flex flex-row justify-center items-end">
								<button className="group pb-2 m-4 border-b-Flamingo-Pink hover:border-b-4 hover:border-b-white">
									<FaFemale className="text-4xl text-white group-hover:text-Flamingo-Pink" />
								</button>
								<button className=" border-b-4 pb-2 m-4 border-b-Flamingo-Pink">
									<FaMale className="text-4xl text-Flamingo-Pink" />
								</button>
							</div>
						</div>
					</div>

					<div className="w-1/2 h-full py-10 px-4 flex flex-col justify-center items-center">
						<div className="w-1/3 m-10">
							<img
								className="rounded-full"
								src={logo}
								alt="Monster Land logo"
							/>
						</div>

						<div className="flex flex-col justify-center items-center">
							<div className="flex flex-col justify-center items-center">
								<h2 className="py-2 m text-4xl font-bold text-Midnight-Gray inline-block">
									Input Your Name
								</h2>
								<input
									className="py-4 px-8 my-8 border-4 border-Indigo-Blue rounded-lg focus:border-Flamingo-Pink"
									type="text"
									placeholder="Your Name"
								/>
							</div>

							<div className="bg-Fire-Engine-Red flex flex-row justify-start items-center p-4 self-stretch">
								<FaExclamationCircle className="mx-2 text-xl text-white" />
								<p className="text-white p-1">Your name is invalid</p>
							</div>
						</div>
					</div>

					<div className="absolute -bottom-10 w-full flex flex-row justify-center items-center">
						<button className="bg-Flamingo-Pink px-16 py-4 text-white rounded-full font-bold text-2xl border-4 border-white hover:border-x-Flamingo-Pink hover:bg-Midnight-Gray">Create</button>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
export default CharacterCreationPage
