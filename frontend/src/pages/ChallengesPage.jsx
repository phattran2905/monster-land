import { useState } from "react"
import { FaAngleLeft, FaAngleRight, FaAngleDoubleUp } from "react-icons/fa"
import coinIcon from "../assets/img/icon/coin_1_.png"
import pickaxeIcon from "../assets/img/icon/Pickaxe.png"
import Footer from "../components/Footer"
import Header from "../components/Header"
import MenuBar from "../components/menu/MenuBar"
import MonsterType from "../components/monster/MonsterType"

export default function ChallengesPage() {
	const [stages, setStages] = useState([
		{ uid: 1, boss: 1 },
		{ uid: 2, boss: 2 },
		{ uid: 3, boss: 1 },
		{ uid: 4, boss: 2 },
		{ uid: 5, boss: 1 },
		{ uid: 6, boss: 2 },
		{ uid: 7, boss: 1 },
		{ uid: 8, boss: 2 },
	])
	const [selectedStageIndex, setSelectedStageIndex] = useState(0)

	const selectStage = (actionType) => {
		if (actionType === "prev") {
			const index = selectedStageIndex - 1
			if (index < 0) {
				setSelectedStageIndex(1)
			} else {
				setSelectedStageIndex(index)
			}
		} else {
			const index = selectedStageIndex + 1
			if (index >= stages.length) {
				setSelectedStageIndex(stages.length - 1)
			} else {
				setSelectedStageIndex(index)
			}
		}
	}
	console.log(selectedStageIndex)
	return (
		<div className="container-xl flex flex-col h-screen justify-between bg-light-white">
			<Header />

			<div className="w-full h-full flex flex-row overflow-hidden">
				<MenuBar />

				<div className="m-10 w-full h-11/12 flex flex-col">
					{/* Challenge Boss */}
					<div className="flex flex-row w-11/12 h-full items-center justify-between">
						{/* Left Arrow */}
						<button
							onClick={() => selectStage("prev")}
							className="shadow-lg"
						>
							<FaAngleLeft
								className={`text-white ${
									selectedStageIndex <= 0
										? "bg-Dim-Gray hover:cursor-not-allowed"
										: "bg-Indigo-Blue hover:bg-Flamingo-Pink"
								} `}
								size={40}
							/>
						</button>

						{/* Stages */}
						<div className="w-full h-full m-4 bg-light-white flex flex-row items-center justify-start overflow-x-hidden">
							{/* Stage Card */}
							{stages.map((stage, index) => (
								<button
									key={stage.uid}
									onClick={() => setSelectedStageIndex(index)}
									className={`bg-white w-1/5 shadow-lg mx-4 rounded-xl  hover:shadow-xl hover:shadow-Flamingo-Pink ${
										index === selectedStageIndex
											? "shadow-Flamingo-Pink "
											: "shadow-Indigo-Blue "
									}`}
								>
									{/* Name */}
									<h3
										className={`rounded-tl-xl rounded-tr-xl bg-Indigo-Blue py-3 text-white font-bold text-xl border-t-4 border-l-4 border-r-4 ${
											index === selectedStageIndex
												? "border-Flamingo-Pink"
												: "border-white"
										}`}
									>
										Stage #1
									</h3>
									{/* Boss Image */}
									<div
										className={`bg-light-white w-80 h-80 p-4 border-r-4 border-l-4 ${
											index === selectedStageIndex
												? "border-Flamingo-Pink"
												: "border-white"
										}`}
									>
										<img
											className="w-full object-scale-down"
											src={`/img/challenges/boss-1.png`}
											alt={"Boss 1"}
										/>
									</div>
									{/* Stats */}
									<div
										className={`flex flex-col items-center py-2 border-r-4 border-l-4 ${
											index === selectedStageIndex
												? "border-Flamingo-Pink"
												: "border-white"
										}`}
									>
										<div className="w-2/3 flex flex-row my-2 justify-between items-center">
											<div className="flex flex-row items-center">
												<img
													src="/img/icons/stats-icons/diamond7.png"
													alt="Diamond icon"
												/>
												<span className="ml-1 capitalize">Type</span>
											</div>
											<MonsterType name={"rock"} />
										</div>

										<div className="w-2/3 flex flex-row my-2 justify-between items-center">
											<div className="flex flex-row items-center">
												<img
													src="/img/icons/stats-icons/sword.png"
													alt="Sword icon"
												/>
												<span className="ml-1 capitalize">Attack</span>
											</div>
											<div className="bg-Midnight-Gray flex flex-row justify-center w-20">
												<span className="p-1 font-bold text-white capitalize">
													{"50"}
												</span>
											</div>
										</div>

										<div className="w-2/3 flex flex-row my-2 justify-between items-center">
											<div className="flex flex-row items-center">
												<img
													src="/img/icons/stats-icons/shield.png"
													alt="Shield icon"
												/>
												<span className="ml-1 capitalize">Defense</span>
											</div>
											<div className="bg-Midnight-Gray flex flex-row justify-center w-20">
												<span className="p-1 font-bold text-white capitalize">
													{"50"}
												</span>
											</div>
										</div>
									</div>

									{/* Rewards */}
									<div
										className={`flex flex-col w-full border-r-4 border-l-4 ${
											index === selectedStageIndex
												? "border-Flamingo-Pink"
												: "border-white"
										}`}
									>
										<p className="bg-Indigo-Blue text-white font-bold p-2">
											Rewards
										</p>
										{/* Reward List */}
										<div className="w-full flex flex-row ">
											{/* Drop items & eggs */}
											<div className="w-1/2 p-3 border-r-4 border-Indigo-Blue flex flex-row flex-wrap gap-3 justify-center">
												<div className="flex flex-row items-center">
													<img
														className="w-5 h-5 object-scale-down"
														src="/img/eggs/inferno-egg.png"
														alt="Diamond icon"
													/>
													<span className="text-Forest-Green font-bold ml-2">
														x1
													</span>
												</div>
												<div className="flex flex-row items-center">
													<img
														className="w-5 h-5 object-scale-down"
														src="/img/eggs/aqua-glow-egg.png"
														alt="Diamond icon"
													/>
													<span className="text-Forest-Green font-bold ml-2">
														x1
													</span>
												</div>
												<div className="flex flex-row items-center">
													<img
														className="w-5 h-5 object-scale-down"
														src="/img/items/exp-boosting-serum.png"
														alt="Diamond icon"
													/>
													<span className="text-Forest-Green font-bold ml-2">
														x1
													</span>
												</div>
												<div className="flex flex-row items-center">
													<img
														className="w-5 h-5 object-scale-down"
														src="/img/items/attack-boosting-potion.png"
														alt="Diamond icon"
													/>
													<span className="text-Forest-Green font-bold ml-2">
														x1
													</span>
												</div>
											</div>
											{/* Points */}
											<div className="w-1/2 p-3 flex flex-col gap-3 justify-center items-center">
												<div className="flex flex-row items-center">
													<div className="flex flex-row items-center justify-between">
														<FaAngleDoubleUp
															className="w-5 h-5 text-Fire-Engine-Red"
															size={14}
														/>
														<span className="font-bold ml-1">EXP</span>
													</div>
													<span className="text-Forest-Green font-bold ml-2">
														+500
													</span>
												</div>
												<div className="flex flex-row items-center">
													<div className="flex flex-row items-center justify-between">
														<img
															className="w-5 h-5 object-scale-down"
															src={coinIcon}
															alt="Coin icon"
														/>
														<span className="font-bold ml-1">
															Coins
														</span>
													</div>
													<span className="text-Forest-Green font-bold ml-2">
														+1000
													</span>
												</div>
											</div>
										</div>
									</div>

									{/* Stamina Cost */}
									<div
										className={`bg-Indigo-Blue p-4 w-full flex flex-row justify-center items-center rounded-bl-xl rounded-br-xl border-r-4 border-l-4 border-b-4 ${
											index === selectedStageIndex
												? "border-Flamingo-Pink"
												: "border-white"
										}`}
									>
										<span className="text-white px-2 font-bold">Cost 20</span>
										<img
											className="w-4 h-4 object-scale-down"
											src={pickaxeIcon}
											alt="Pickaxe icon"
										/>
									</div>
								</button>
							))}
						</div>

						{/* Right Arrow */}
						<button
							onClick={() => selectStage("next")}
							className="shadow-lg"
						>
							<FaAngleRight
								className={`text-white ${
									selectedStageIndex >= stages.length - 1
										? "bg-Dim-Gray hover:cursor-not-allowed"
										: "bg-Indigo-Blue hover:bg-Flamingo-Pink"
								} `}
								size={40}
							/>
						</button>
					</div>
					{/* Challenge Button */}
					<div className="h-1/12 w-11/12 p-6 flex flex-row justify-center items-center">
						<button className="bg-Flamingo-Pink px-14 py-4 rounded-full text-2xl text-white font-bold hover:bg-Fire-Engine-Red">
							Challenge
						</button>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	)
}
