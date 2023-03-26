import { useState } from "react"
import moment from "moment"
import { FaClock, FaShoppingBasket } from "react-icons/fa"
import MonsterType from "../monster/Type"

export default function Egg({
	uid,
	name,
	monster_type,
	img_name,
	hatching_time_in_seconds,
	amount,
	onSelect,
}) {
	const [hatchingTime] = useState(() => {
		const duration = moment.duration(hatching_time_in_seconds, "seconds")
		const hours = Math.floor(duration.asHours())
		const minutes = duration.minutes()
		const seconds = duration.seconds()
		return `${hours}:${minutes.toString()}:${seconds.toString()}`
	})

	return (
		<div className="mx-4 h-80 flex flex-row border-2 border-Royal-Blue">
			<div className="w-60 h-full flex flex-col border-r-2 border-r-Royal-Blue">
				<div className="w-full p-4 h-5/6">
					<img
						className="w-full h-full object-scale-down"
						src={`/img/eggs/${img_name}`}
						alt={name}
					/>
				</div>
				<div className="w-full h-1/6 bg-Royal-Blue flex flex-col items-stretch justify-center">
					<span className="text-white font-bold text-center text-lg">{name}</span>
				</div>
			</div>

			<div className="w-52 h-full py-4 px-6 flex flex-col justify-between items-stretch border-l-2 border-l-Royal-Blue">
				<div className="flex flex-col mb-3">
					<div className="flex flex-row items-center mb-1">
						<FaClock
							className="text-Flamingo-Pink"
							size={16}
						/>
						<span className="ml-1 font-bold capitalize">Hatching time</span>
					</div>
					<div className="bg-Midnight-Gray flex flex-row justify-center">
						<span className="p-1 font-bold text-white tracking-widest">{hatchingTime}</span>
					</div>
				</div>
				<div className="flex flex-col mb-3">
					<div className="flex flex-row items-center mb-1">
						<FaShoppingBasket
							className="text-Flamingo-Pink"
							size={16}
						/>
						<span className="ml-1 font-bold capitalize">Amount</span>
					</div>
					<div className="bg-Midnight-Gray flex flex-row justify-center">
						<span className="p-1 font-bold text-white capitalize">{amount}</span>
					</div>
				</div>
				<div className="flex flex-col mb-3">
					<div className="flex flex-row items-center mb-1">
						<img
							src="/img/icons/stats-icons/diamond7.png"
							alt="Diamond icon"
						/>
						<span className="ml-1 font-bold capitalize">Monster Type</span>
					</div>
					<div className="flex flex-row justify-center items-stretch">
						<MonsterType name={monster_type} />
					</div>
				</div>
				<button
					className="p-2 bg-Flamingo-Pink mt-2 text-white font-bold rounded-full hover:bg-Gold-Sand hover:text-Midnight-Gray"
					onClick={() => onSelect()}
				>
					Incubate
				</button>
			</div>
		</div>
	)
}
