import MonsterType from "./MonsterType"
import { FaAngleDoubleUp, FaChessRook } from "react-icons/fa"
import { AiOutlineNumber } from "react-icons/ai"
import { MdOutlineCategory } from "react-icons/md"
import { GiBroadsword, GiLightningShield } from "react-icons/gi"
import ProgressBar from "../ProgressBar"

export default function MonsterCard({
	uid,
	name,
	type,
	level,
	img_name,
	attack,
	defense,
	exp,
	level_up_exp,
}) {
	return (
		<div className="flex flex-row border-2 border-Royal-Blue">
			{/* Name & Image */}
			<div className="w-60 h-full flex flex-col border-r-2 border-r-Royal-Blue">
				<div className="w-full p-4 h-5/6">
					<img
						className="w-full h-full object-scale-down"
						src={`/img/monsters/${img_name}`}
						alt={name}
					/>
				</div>
				<div className="w-full h-1/6 bg-Royal-Blue flex flex-col items-stretch justify-center">
					<span className="text-white font-bold text-center text-lg">{name}</span>
				</div>
			</div>

			{/* Stats */}
			<div className="w-60 h-full p-4 flex flex-col justify-between items-stretch border-l-2 border-l-Royal-Blue">
				<div className="flex flex-row mb-3 justify-between items-center">
					<div className="flex flex-row items-center mb-1">
						<AiOutlineNumber
							size={20}
							className="text-Fire-Engine-Red font-bold"
						/>
						<span className="ml-1 capitalize">UID</span>
					</div>
					<div className="bg-Midnight-Gray rounded-lg flex flex-row justify-center w-32">
						<span className="p-1 font-bold text-white capitalize">{uid}</span>
					</div>
				</div>
				<div className="flex flex-row mb-3 justify-between items-center">
					<div className="flex flex-row items-center mb-1">
						<FaChessRook
							size={20}
							className="text-Fire-Engine-Red font-bold"
						/>
						<span className="ml-1 capitalize">Level</span>
					</div>
					<div className="bg-Midnight-Gray rounded-lg flex flex-row justify-center w-20">
						<span className="p-1 font-bold text-white capitalize">{level}</span>
					</div>
				</div>
				<div className="flex flex-row mb-3 justify-between items-center">
					<div className="flex flex-row items-center mb-1">
						<MdOutlineCategory
							size={20}
							className="text-Fire-Engine-Red font-bold"
						/>
						<span className="ml-1 capitalize">Type</span>
					</div>
					<MonsterType name={type} />
				</div>

				<div className="flex flex-row mb-3 justify-between items-center">
					<div className="flex flex-row items-center mb-1">
						<GiBroadsword
							size={20}
							className="text-Fire-Engine-Red font-bold"
						/>
						<span className="ml-1 capitalize">Attack</span>
					</div>
					<div className="bg-Midnight-Gray rounded-lg flex flex-row justify-center w-20">
						<span className="p-1 font-bold text-white capitalize">{attack}</span>
					</div>
				</div>

				<div className="flex flex-row mb-3 justify-between items-center">
					<div className="flex flex-row items-center mb-1">
						<GiLightningShield
							size={20}
							className="text-Fire-Engine-Red font-bold"
						/>
						<span className="ml-1 capitalize">Defense</span>
					</div>
					<div className="bg-Midnight-Gray rounded-lg flex flex-row justify-center w-20">
						<span className="p-1 font-bold text-white capitalize">{defense}</span>
					</div>
				</div>

				<div className="flex flex-col justify-between items-stretch">
					<div className="flex flex-row items-center mb-1">
						<FaAngleDoubleUp
							className="text-Flamingo-Pink"
							size={20}
						/>
						<span className="ml-1 capitalize">Exp</span>
					</div>
					<div className="flex flex-col justify-center w-full pt-1">
						<ProgressBar
							percentage={Math.floor((exp / level_up_exp) * 100)}
							bgColorClass="bg-Light-Gray"
							currentBgColorClass="bg-Forest-Green"
						/>
						<div className="flex flex-row justify-end items-center mt-2">
							<p className="text-sm font-bold">
								<span className="text-sm text-Forest-Green font-bold">{exp}</span>
								{" / "}
								{level_up_exp}
							</p>
						</div>
					</div>
				</div>

				{/* <button
					className="p-2 bg-Flamingo-Pink mt-1 text-white font-bold rounded-full hover:bg-Gold-Sand hover:text-Midnight-Gray"
					onClick={() => onSelect()}
				>
					Assign
				</button> */}
			</div>
		</div>
	)
}
