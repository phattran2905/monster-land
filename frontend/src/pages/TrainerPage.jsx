import Header from "../components/Header"
import Footer from "../components/Footer"
import MenuBar from "../components/menu/MenuBar"
import ProgressBar from "../components/ProgressBar"
import {
	FaSignInAlt,
    FaCalendarCheck,
	FaTransgender,
	FaAngleLeft,
	FaAngleRight,
	FaExclamationCircle,
	FaUserTag,
} from "react-icons/fa"
import Male1Image from "../assets/img/trainer/male-1.png"

function TrainerPage() {
	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />
			<div className="w-full h-full flex flex-row">
				<MenuBar />
				<div className="w-full px-32 py-12 flex flex-col justify-center items-center">
					<div className="w-3/4 flex flex-row justify-start items-start border-2 border-Indigo-Blue rounded-md relative">
						<div className="w-1/2 h-full p-10 bg-Indigo-Blue flex flex-col items-center">
							<h2 className="py-2 text-4xl font-bold text-Gold-Sand border-b-4 border-Gold-Sand inline-block">
								Avatar
							</h2>

							<div className="w-full">
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

								<div className="flex flex-col justify-center py-4 px-8">
									<p className="my-3 text-white underline font-bold text-xl">
										EXP:
									</p>

									<div className="">
										<ProgressBar
											height={"h-3"}
											percentage={10}
											bgColorClass={`bg-white`}
											currentBgColorClass={`bg-Gold-Sand`}
										/>

										<div className="flex flex-row mt-2 justify-between items-center">
											<span className="text-Gold-Sand font-bold text-lg inline-block">
												300
											</span>
											<span className="text-white font-bold text-lg inline-block">
												3,000
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="w-1/2 h-full p-16 flex flex-col items-center">
							<div className="w-full flex flex-col items-stretch my-4">
								<div className="flex flex-col mb-6">
									<label
										htmlFor="name"
										className="text-Indigo-Blue font-bold flex flex-row text-xl mb-2"
									>
										<FaUserTag className="text-2xl mr-1" />
										Name
									</label>
									<input
										name="name"
										id="name"
										className="border-4 border-Indigo-Blue px-8 py-4 rounded-full focus:border-Flamingo-Pink"
										type="text"
										placeholder="Your Name"
									/>
								</div>
								<div className="flex flex-col mb-6">
									<label
										htmlFor="gender"
										className="text-Indigo-Blue font-bold flex flex-row text-xl mb-2"
									>
										<FaTransgender className="text-2xl mr-1" />
										Gender
									</label>
									<select
										name="gender"
										id="gender"
										className="border-4 border-Indigo-Blue px-8 py-4 rounded-full focus:border-Flamingo-Pink"
									>
										<option
											value="female"
											className="text-Flamingo-Pink"
										>
											Female
										</option>
										<option value="male">Male</option>
									</select>
								</div>
								<div className="flex flex-col mb-6">
									<span className="text-Indigo-Blue font-bold flex flex-row text-xl mb-2">
										<FaCalendarCheck className="text-2xl mr-1" />
										Joined
									</span>
									<span className="border-4 border-Indigo-Blue px-8 py-4 rounded-full bg-Midnight-Gray text-white">
										Jan 17, 2023
									</span>
								</div>
								<div className="flex flex-col mb-6">
									<span className="text-Indigo-Blue font-bold flex flex-row text-xl mb-2">
										<FaSignInAlt className="text-2xl mr-1" />
										Last login
									</span>

									<span className="border-4 border-Indigo-Blue px-8 py-4 rounded-full bg-Midnight-Gray text-white">
										Feb 12, 2023
									</span>
								</div>
							</div>

							<div className="bg-Fire-Engine-Red flex flex-row justify-start items-center p-4 self-stretch">
								<FaExclamationCircle className="mx-2 text-xl text-white" />
								<p className="text-white p-1">Your name is invalid</p>
							</div>
						</div>
					</div>
					<div className="w-full mt-10 flex flex-row justify-center items-center">
						<button className="bg-Flamingo-Pink px-16 py-4 text-white rounded-full font-bold text-2xl border-4 border-white hover:border-Flamingo-Pink hover:bg-white hover:text-Flamingo-Pink">
							Save changes
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
export default TrainerPage
