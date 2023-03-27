
import MonsterType from "../../components/monster/MonsterType"
import HealthBar from "./HealthBar"

function MonsterCard() {
	return (
		<div className="flex flex-col w-1/5 ">
			<div className={`bg-white shadow-lg mx-4 rounded-xl  shadow-Flamingo-Pink `}>
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
							<span className="p-1 font-bold text-white capitalize">{"50"}</span>
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
							<span className="p-1 font-bold text-white capitalize">{"50"}</span>
						</div>
					</div>
				</div>
			</div>

			<HealthBar />
		</div>
	)
}
export default MonsterCard
