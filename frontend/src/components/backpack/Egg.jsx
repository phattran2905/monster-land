import { useState } from "react";
import moment from "moment";
import { FaClock, FaShoppingBasket } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import MonsterType from "../monster/MonsterType";

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
		const duration = moment.duration(hatching_time_in_seconds, "seconds");
		const hours = Math.floor(duration.asHours());
		const minutes = duration.minutes();
		const seconds = duration.seconds();
		return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	});

	return (
		<div className="md:h-[21rem] flex flex-row border-2 border-Royal-Blue hover:shadow-lg hover:shadow-Amethyst-Purple">
			{/* Name & Image */}
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

			{/* Info */}
			<div className="w-52 h-full flex flex-col justify-between items-stretch border-l-2 border-l-Royal-Blue">
				<div className="w-full bg-white py-4 px-6">
					<div className="flex flex-col mb-3">
						<div className="flex flex-row items-center mb-1">
							<FaClock
								className="text-Flamingo-Pink"
								size={16}
							/>
							<span className="ml-1 font-bold capitalize">Hatching time</span>
						</div>
						<div className="bg-Midnight-Gray border-2 border-Indigo-Blue rounded-lg flex flex-row justify-center">
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
						<div className="bg-Midnight-Gray border-2 border-Indigo-Blue rounded-lg flex flex-row justify-center">
							<span className="p-1 font-bold text-white tracking-widest">{amount}</span>
						</div>
					</div>
					<div className="flex flex-col mb-3">
						<div className="flex flex-row items-center mb-1">
							<MdOutlineCategory
								size={16}
								className="text-Fire-Engine-Red font-bold"
							/>
							<span className="ml-1 font-bold capitalize">Monster Type</span>
						</div>
						<div className="flex flex-row justify-center items-stretch">
							<MonsterType name={monster_type} />
						</div>
					</div>
				</div>
				{/* Button */}
				<div className="flex flex-row items-stretch w-full p-2">
					<button
						className="w-full p-2 bg-Flamingo-Pink text-white font-bold rounded-full border-4 border-Flamingo-Pink hover:bg-white hover:text-Flamingo-Pink"
						onClick={() => onSelect({ uid, name, img_name })}
					>
						Incubate
					</button>
				</div>
			</div>
		</div>
	);
}
