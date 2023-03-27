import { useState, useEffect } from "react"
import { FaTimesCircle, FaClock, FaShoppingBasket } from "react-icons/fa"
import { useSelector } from "react-redux"
import { useGetBackpackQuery } from "../../redux/services/backpack"
import Egg from "../backpack/Egg"
import MonsterType from "../monster/MonsterType"

function SelectEggModal({ onClose, onStartIncubating }) {
	const authState = useSelector((state) => state.auth)
	const { data: backpackData, isLoading } = useGetBackpackQuery({ jwt_token: authState.jwtToken })
	const [eggs, setEggs] = useState([])
	const [selectedUID, setSelectedUID] = useState()

	// Set Items and Eggs
	useEffect(() => {
		if (backpackData) {
			const eggs = backpackData.egg_list
			setEggs(eggs)
		}
	}, [backpackData])

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
					<div className="h-full px-8 bg-light-white flex flex-row flex-wrap content-start gap-y-8 gap-x-12 overflow-auto mb-6 ">
						{eggs.map((egg) => (
							<button
								key={egg.uid}
								onClick={() => setSelectedUID(egg.uid)}
								className={`h-60 flex flex-row border-4 hover:border-Flamingo-Pink hover:border-4 
                            ${
								selectedUID === egg.uid
									? "border-Flamingo-Pink"
									: "border-Royal-Blue"
							}`}
							>
								{/* Name & Image */}
								<div className="w-52 h-full flex flex-col border-r-2 border-r-Royal-Blue">
									<div className="w-full p-4 h-5/6">
										<img
											className="w-full h-full object-scale-down"
											src={`/img/eggs/${egg.img_name}`}
											alt={egg.name}
										/>
									</div>
									<div className="w-full h-1/6 bg-Royal-Blue flex flex-col items-stretch justify-center">
										<span className="text-white font-bold text-center text-lg">
											{egg.name}
										</span>
									</div>
								</div>
								{/* Stats */}
								<div className="w-52 h-full py-4 px-6 flex flex-col justify-between items-stretch border-l-2 border-l-Royal-Blue">
									<div className="flex flex-col mb-3">
										<div className="flex flex-row items-center mb-1">
											<FaClock
												className="text-Flamingo-Pink"
												size={16}
											/>
											<span className="ml-1 font-bold capitalize">
												Hatching time
											</span>
										</div>
										<div className="bg-Midnight-Gray flex flex-row justify-center">
											<span className="p-1 font-bold text-white tracking-widest">
												{egg.hatching_time}
											</span>
										</div>
									</div>
									<div className="flex flex-col mb-3">
										<div className="flex flex-row items-center mb-1">
											<FaShoppingBasket
												className="text-Flamingo-Pink"
												size={16}
											/>
											<span className="ml-1 font-bold capitalize">
												Amount
											</span>
										</div>
										<div className="bg-Midnight-Gray flex flex-row justify-center">
											<span className="p-1 font-bold text-white capitalize">
												{egg.amount}
											</span>
										</div>
									</div>
									<div className="flex flex-col mb-3">
										<div className="flex flex-row items-center mb-1">
											<img
												src="/img/icons/stats-icons/diamond7.png"
												alt="Diamond icon"
											/>
											<span className="ml-1 font-bold capitalize">
												Monster Type
											</span>
										</div>
										<div className="flex flex-row justify-center items-stretch">
											<MonsterType name={egg.monster_type} />
										</div>
									</div>
								</div>
							</button>
						))}
					</div>

					<div className="w-full flex flex-row justify-center items-start">
						<button
							onClick={() => onStartIncubating(egg.uid)}
							className="bg-Flamingo-Pink py-2 px-8 rounded-full hover:bg-Indigo-Blue"
						>
							<span className="text-white font-bold text-xl">Confirm</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
export default SelectEggModal
