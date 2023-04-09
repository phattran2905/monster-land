import { useState } from "react"
import { FaTimesCircle } from "react-icons/fa"
import MonsterType from "../monster/MonsterType"

function HatchModal({ monster, onClose, onNext }) {
	return (
		<div className="w-full h-full absolute left-0 bg-white flex flex-row justify-center items-center bg-opacity-80">
			<div className="relative w-1/2 shadow-2xl flex flex-col bg-white rounded-2xl">
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute -right-4 -top-4 bg-white rounded-full"
				>
					<FaTimesCircle
						size={40}
						className="text-Fire-Engine-Red hover:text-black"
					/>
				</button>

				{/* Header */}
				<div className="bg-Indigo-Blue py-4 px-6">
					<h2 className="text-white font-bold text-xl">
						Congratulations! You have a new monster
					</h2>
				</div>

				{/* Content */}
				<div className="w-full flex flex-col justify-between py-10 px-12 items-center">
					<div className="my-10 flex flex-row items-stretch border-2 border-Royal-Blue relative">
						{/* Badge */}
						<div className="absolute -top-2 -left-9 bg-Forest-Green rounded-xl px-8 py-1 -rotate-[40deg] shadow-Fresh-Green shadow-md">
							<span className="text-white font-bold">New</span>
						</div>
						{/* Name & Image */}
						<div className="w-60 h-full flex flex-col border-r-4 border-r-Royal-Blue">
							<div className="w-full h-1/6 bg-Royal-Blue flex flex-col items-stretch justify-center py-3">
								<span className="text-white font-bold text-center text-lg capitalize">
									{monster.name}
								</span>
							</div>
							<div className="w-full p-4 h-5/6">
								<img
									className="w-full h-full object-scale-down"
									src={`/img/monsters/${monster.img_name}`}
									alt={monster.name}
								/>
							</div>
						</div>

						{/* Stats */}
						<div className="w-60 px-6 flex flex-col justify-center items-stretch border-l-Royal-Blue ">
							{/* Level */}
							<div className="flex flex-row mb-3 justify-between items-center ">
								<div className="flex flex-row items-center mb-1">
									<img
										src="/img/icons/stats-icons/chess.png"
										alt="Chess icon"
									/>
									<span className="ml-1 capitalize">Level</span>
								</div>
								<div className="bg-Midnight-Gray flex flex-row justify-center w-20 rounded-xl">
									<span className="p-1 font-bold text-white capitalize">
										{monster.level}
									</span>
								</div>
							</div>
							{/* Type */}
							<div className="flex flex-row mb-3 justify-between items-center">
								<div className="flex flex-row items-center mb-1">
									<img
										src="/img/icons/stats-icons/diamond7.png"
										alt="Diamond icon"
									/>
									<span className="ml-1 capitalize">Type</span>
								</div>
								<MonsterType name={monster.monster_type} />
							</div>

							<div className="flex flex-row mb-3 justify-between items-center">
								<div className="flex flex-row items-center mb-1">
									<img
										src="/img/icons/stats-icons/sword.png"
										alt="Sword icon"
									/>
									<span className="ml-1 capitalize">Attack</span>
								</div>
								<div className="bg-Midnight-Gray flex flex-row justify-center w-20 rounded-xl">
									<span className="p-1 font-bold text-white capitalize">
										{monster.attack}
									</span>
								</div>
							</div>
							{/* Defense */}
							<div className="flex flex-row mb-3 justify-between items-center">
								<div className="flex flex-row items-center mb-1">
									<img
										src="/img/icons/stats-icons/shield.png"
										alt="Shield icon"
									/>
									<span className="ml-1 capitalize">Defense</span>
								</div>
								<div className="bg-Midnight-Gray flex flex-row justify-center w-20 rounded-xl">
									<span className="p-1 font-bold text-white capitalize">
										{monster.defense}
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className="w-full flex flex-row justify-center items-center mt-12">
						<button
							onClick={onNext}
							className="bg-Flamingo-Pink py-2 px-8 rounded-full border-2 border-Flamingo-Pink text-white font-bold text-xl hover:bg-white hover:text-Flamingo-Pink"
						>
							Go to Collection
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
export default HatchModal
