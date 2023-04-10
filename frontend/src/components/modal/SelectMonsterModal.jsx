import { useState, useEffect } from "react"
import { FaAngleDoubleUp, FaChessRook, FaTimesCircle } from "react-icons/fa"
import { AiOutlineNumber } from "react-icons/ai"
import { MdOutlineCategory } from "react-icons/md"
import { GiBroadsword, GiLightningShield } from "react-icons/gi"
import { useSelector } from "react-redux"
import { useGetMonsterCollectionQuery } from "../../redux/services/collection"
import MonsterType from "../monster/MonsterType"

function SelectMonsterModal({ onClose, onSelectMonster }) {
	const authState = useSelector((state) => state.auth)
	const { data: monsterCollection, refetch: refetchMonsterCollection } =
		useGetMonsterCollectionQuery({
			jwt_token: authState.jwtToken,
		})
	const [monsters, setMonsters] = useState([])
	const [selectedUID, setSelectedUID] = useState()

	useEffect(() => {
		refetchMonsterCollection()
	}, [])

	// Set Items and Eggs
	useEffect(() => {
		if (monsterCollection) {
			setMonsters(monsterCollection.monster_list)
		}
	}, [monsterCollection])

	return (
		<div className="w-full h-full absolute left-0 bg-white flex flex-row justify-center items-center bg-opacity-80">
			<div className="relative w-5/6 h-3/4 shadow-2xl flex flex-col bg-white ">
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
					<h2 className="text-white font-bold text-xl">Select an egg</h2>
				</div>

				{/* Content */}
				<div className="h-full flex flex-col justify-between rounded-2xl py-10">
					<div className="h-full px-8 bg-light-white flex flex-row flex-wrap content-start gap-y-8 gap-x-12 overflow-auto ">
						{monsters?.length === 0 ? (
							<div className="h-full w-full flex flex-row justify-center items-center">
								<span className="inline-block text-Dim-Gray bg-Anti-flash-white font-bold py-2 px-10 rounded-full italic my-auto">
									You have no monster
								</span>
							</div>
						) : (
							monsters.map((monster) => (
								<button
									key={monster.uid}
									onClick={() => setSelectedUID(monster.uid)}
									className={`h-60 flex flex-row border-4 hover:border-Flamingo-Pink hover:border-4 
                            ${
								selectedUID === monster.uid
									? "border-Flamingo-Pink"
									: "border-Royal-Blue"
							}`}
								>
									{/* Name & Image */}
									<div className="w-52 h-full flex flex-col border-r-2 border-r-Royal-Blue">
										<div className="w-full p-4 h-5/6">
											<img
												className="w-full h-full object-scale-down"
												src={`/img/monsters/${monster.img_name}`}
												alt={monster.name}
											/>
										</div>
										<div className="w-full h-1/6 bg-Royal-Blue flex flex-col items-stretch justify-center">
											<span className="text-white font-bold text-center text-lg">
												{monster.name}
											</span>
										</div>
									</div>
									{/* Stats */}
									<div className="w-52 h-full py-4 px-6 flex flex-col justify-between items-stretch border-l-2 border-l-Royal-Blue">
										{/* Type */}
										<div className="flex flex-col mb-3 items-center">
											<div className="flex flex-row items-center mb-1">
												<MdOutlineCategory
													size={20}
													className="text-Fire-Engine-Red font-bold"
												/>
												<span className="ml-1 font-bold capitalize">
													Type
												</span>
											</div>
											<div className="flex flex-row justify-center items-stretch">
												<MonsterType name={monster.monster_type} />
											</div>
										</div>
										{/* Attack */}
										<div className="flex flex-col mb-3 items-center">
											<div className="flex flex-row items-center mb-1">
												<GiBroadsword
													size={20}
													className="text-Fire-Engine-Red font-bold"
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
										<div className="flex flex-col mb-3 items-center">
											<div className="flex flex-row items-center mb-1">
												<GiLightningShield
													size={20}
													className="text-Fire-Engine-Red font-bold"
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
								</button>
							))
						)}
					</div>

					<div className="w-full flex flex-row justify-center items-center py-4 bg-white">
						<button
							onClick={() =>
								onSelectMonster(monsters.find((m) => m.uid === selectedUID))
							}
							className="bg-Flamingo-Pink py-2 px-14 rounded-full border-4 border-Flamingo-Pink hover:text-Flamingo-Pink hover:border-Flamingo-Pink hover:bg-white text-white font-bold text-xl"
						>
							Fight
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
export default SelectMonsterModal
