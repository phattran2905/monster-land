import { useState } from "react"
import coinIcon from "../../assets/img/icon/coin_1_.png"
import pickaxeIcon from "../../assets/img/icon/Pickaxe.png"
import MonsterType from "..//monster/MonsterType"

function ChallengeRewards({onReturnStages}) {
	const [rewardList, setRewardList] = useState([
		{
			uid: 1,
			list: [],
		},
		{
			uid: 2,
			list: [],
		},
		{
			uid: 3,
			list: [],
		},
		{
			uid: 4,
			list: [],
		},
		{
			uid: 5,
			list: [],
		},
		{
			uid: 6,
			list: [],
		},
	])
	return (
		<div className="w-full h-full flex flex-col">
			<div className="flex flex-row w-full items-start justify-between">
				{/* Monster Card */}
				<div
					className={`w-1/5 bg-white shadow-lg mx-4 rounded-xl shadow-Forest-Green relative`}
				>
					{/* Badge */}
					<div className="absolute top-0 -left-6 bg-Forest-Green rounded-xl px-8 py-2 -rotate-[40deg] shadow-Fresh-Green shadow-lg">
						<span className="text-white font-bold">Winner</span>
					</div>
					{/* Name */}
					<h3
						className={`rounded-tl-xl rounded-tr-xl bg-Indigo-Blue py-3 text-white font-bold text-xl text-center`}
					>
						Monster #1
					</h3>
					{/* Boss Image */}
					<div className={`bg-light-white w-full p-4`}>
						<img
							className="w-full object-scale-down"
							src={`/img/monsters/shockwhisker.png`}
							alt={"Boss 1"}
						/>
					</div>
					{/* Stats */}
					<div className={`flex flex-col items-center py-2`}>
						{/* Type */}
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

						{/* Attack */}
						<div className="w-2/3 flex flex-row my-2 justify-between items-center">
							<div className="flex flex-row items-center">
								<img
									src="/img/icons/stats-icons/sword.png"
									alt="Sword icon"
								/>
								<span className="ml-1 capitalize">Attack</span>
							</div>
							<div className="bg-Midnight-Gray flex flex-row justify-center w-20">
								<span className="p-1 font-bold text-white capitalize">{"50"}</span>
							</div>
						</div>

						{/* Defense */}
						<div className="w-2/3 flex flex-row my-2 justify-between items-center">
							<div className="flex flex-row items-center">
								<img
									src="/img/icons/stats-icons/shield.png"
									alt="Shield icon"
								/>
								<span className="ml-1 capitalize">Defense</span>
							</div>
							<div className="bg-Midnight-Gray flex flex-row justify-center w-20">
								<span className="p-1 font-bold text-white capitalize">{"50"}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Reward list */}
				<div className="w-3/4 flex flex-col border-4 border-Indigo-Blue rounded-lg">
					<h3 className="bg-Indigo-Blue text-white font-bold text-2xl py-4 px-6">
						Rewards
					</h3>

					{/* Items && Eggs */}
					<div className="flex flex-row w-full flex-wrap bg-white">
						{rewardList.map((reward) => (
							<div
								key={reward.uid}
								className="w-1/2 my-6 p-4"
							>
								<div className="flex flex-row justify-center items-center">
									<img
										className="w-14 h-14 object-scale-down"
										src="/img/eggs/lunar-egg.png"
										name="Lunar egg"
									/>
									<span className="text-4xl font-bold text-Royal-Blue capitalize ml-8 mr-12">
										Lunar egg
									</span>
									<span className="text-4xl font-bold text-Forest-Green">x1</span>
								</div>
							</div>
						))}
					</div>

					{/* Points */}
					<div className="flex flex-col justify-center items-center p-4 w-full">
						<div className="w-1/4 flex flex-row justify-between items-center">
							<div className="flex flex-row items-center">
								<img
									className="p-3"
									src={coinIcon}
									alt="Coin icon"
								/>
								<span className="text-4xl font-bold text-Indigo-Blue">Coins</span>
							</div>
							<span className="text-Forest-Green text-4xl font-bold">+1,000</span>
						</div>
						<div className="w-1/4 flex flex-row justify-between items-center">
							<div className="flex flex-row items-center">
								<img
									className="p-3"
									src={pickaxeIcon}
									alt="Pickaxe icon"
								/>
								<span className="text-4xl font-bold text-Indigo-Blue">Stamina</span>
							</div>
							<span className="text-Fire text-4xl font-bold">-20</span>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full flex flex-row justify-center items-center mt-40">
				<button className="py-3 px-10 bg-Midnight-Gray text-white font-bold text-2xl rounded-full hover:bg-Indigo-Blue">
					Return
				</button>
			</div>
		</div>
	)
}
export default ChallengeRewards
