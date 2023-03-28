import MonsterType from "../../components/monster/MonsterType"
import HealthBar from "./HealthBar"

function BossCard({ isWinner, health, boss }) {
	return (
		<div className="flex flex-col">
			<div className={`bg-white shadow-lg mx-4 rounded-xl  shadow-Fire-Engine-Red relative`}>
				{/* Badge */}
				{isWinner && (
					<div className="absolute top-0 -left-6 bg-Forest-Green rounded-xl px-8 py-2 -rotate-[40deg] shadow-Fresh-Green shadow-lg">
						<span className="text-white font-bold">Winner</span>
					</div>
				)}

				{/* Name */}
				<h3
					className={`rounded-tl-xl rounded-tr-xl bg-Indigo-Blue py-3 text-white font-bold text-xl text-center`}
				>
					{boss.boss_name}
				</h3>
				{/* Boss Image */}
				<div className={`bg-light-white w-full p-4`}>
					<img
						className="w-full object-scale-down"
						src={`/img/challenges/${boss.boss_img_name}`}
						alt={boss.boss_name}
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
						<MonsterType name={boss.boss_type} />
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
								{boss.boss_attack}
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
								{boss.boss_defense}
							</span>
						</div>
					</div>
				</div>
			</div>

			<HealthBar percentage={health} />
		</div>
	)
}
export default BossCard
