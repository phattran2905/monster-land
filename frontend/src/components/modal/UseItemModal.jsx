import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { FaTimesCircle, FaPlus, FaMinus } from "react-icons/fa"
import { AiFillWarning } from "react-icons/ai"
import MonsterType from "../monster/MonsterType"
import { useGetMonsterCollectionQuery } from "../../redux/services/collection"

function UseItemModal({ onUse, onClose, itemToUse }) {
	const authState = useSelector((state) => state.auth)
	const { data: monsterCollection, refetch: refetchMonsterCollection } =
		useGetMonsterCollectionQuery({
			jwt_token: authState.jwtToken,
		})
	const [monsters, setMonsters] = useState([])
	const [selectedUID, setSelectedUID] = useState()
	const [amount, setAmount] = useState(1)
	const [error, setError] = useState()

	// useEffect(() => {
	// 	refetchMonsterCollection()
	// }, [])

	// Set Items and Eggs
	useEffect(() => {
		if (monsterCollection) {
			setMonsters(monsterCollection.monster_list)
		}
	}, [monsterCollection])

	const onIncreaseAmount = () => {
		if (amount < itemToUse.amount) {
			setAmount((prev) => prev + 1)
		} else {
			setAmount(itemToUse.amount)
		}
	}

	const onDecreaseAmount = () => {
		if (amount > 1) {
			setAmount((prev) => prev - 1)
		} else {
			setAmount(1)
		}
	}

	const useButtonHandler = () => {
		setError()

		if (!selectedUID) {
			setError("Please select a monster")
			return
		}

		return onUse({
			...itemToUse,
			amountToUse: amount,
			monster_uid: selectedUID,
		})
	}

	return (
		<div className="w-full h-full absolute left-0 bg-white flex flex-row justify-center items-start bg-opacity-80">
			<div className="relative w-11/12 h-5/6 shadow-2xl flex flex-col bg-white ">
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
					<h2 className="text-white font-bold text-xl">Confirm</h2>
				</div>

				{/* Content */}
				<div className="h-full flex flex-col justify-between rounded-2xl py-10">
					<div className="h-full px-8 bg-light-white flex flex-row flex-wrap content-start gap-y-8 gap-x-12 overflow-auto mb-4">
						{monsters.map((monster) => (
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
									<div className="flex flex-col mb-3 items-center">
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
											<MonsterType name={monster.monster_type} />
										</div>
									</div>
									<div className="flex flex-col mb-3 items-center">
										<div className="flex flex-row items-center mb-1">
											<img
												src="/img/icons/stats-icons/sword.png"
												alt="Sword icon"
											/>
											<span className="ml-1 capitalize">Attack</span>
										</div>
										<div className="bg-Midnight-Gray flex flex-row justify-center w-20">
											<span className="p-1 font-bold text-white capitalize">
												{monster.attack}
											</span>
										</div>
									</div>
									<div className="flex flex-col mb-3 items-center">
										<div className="flex flex-row items-center mb-1">
											<img
												src="/img/icons/stats-icons/shield.png"
												alt="Shield icon"
											/>
											<span className="ml-1 capitalize">Defense</span>
										</div>
										<div className="bg-Midnight-Gray flex flex-row justify-center w-20">
											<span className="p-1 font-bold text-white capitalize">
												{monster.defense}
											</span>
										</div>
									</div>
								</div>
							</button>
						))}
					</div>

					<div className="w-full flex flex-col justify-start items-center bg-white">
						{error && (
							<div className="w-full flex flex-row justify-center items-stretch bg-white p-4">
								<p className="bg-Fire-Engine-Red py-2 px-6 text-white rounded-md font-bold flex flex-row items-center">
									<AiFillWarning className="text-white mx-1" />
									{error}
								</p>
							</div>
						)}
						<div className="w-full flex flex-row justify-center items-stretch bg-Midnight-Gray p-4">
							<div className="mx-6 flex flex-row justify-center items-center">
								<span className="text-white font-bold text-xl mr-2 underline">
									Item:
								</span>
								<img
									className="w-8 h-8 object-scale-down"
									src={`/img/items/${itemToUse.img_name}`}
									alt={itemToUse.name}
								/>
								<span className="text-white font-bold text-xl mx-2">
									{itemToUse.name}
								</span>
							</div>
							<div className="mx-6 flex flex-row justify-center items-center">
								<label
									htmlFor="amount"
									className="text-white font-bold text-xl underline mx-4"
								>
									Amount:
								</label>
								<button
									onClick={() => onDecreaseAmount()}
									className="mx-2 text-white bg-Flamingo-Pink flex flex-row justify-center items-center p-2 rounded-md border-4 border-Midnight-Gray hover:text-Gold-Sand"
								>
									<FaMinus className="font-bold " />
								</button>
								<input
									className="p-2 w-20 border-Indigo-Blue border-4 rounded-xl focus:border-Flamingo-Pink font-bold text-center text-lg outline-none m-0"
									type="number"
									name="amount"
									id="amount"
									min={1}
									max={itemToUse?.amount}
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
								/>
								<button
									onClick={() => onIncreaseAmount()}
									className="mx-2 text-white bg-Flamingo-Pink flex flex-row justify-center items-center p-2 rounded-md border-4 border-Midnight-Gray hover:text-Gold-Sand"
								>
									<FaPlus className="font-bold " />
								</button>
							</div>

							{/* Use button */}
							<div className="mx-6 flex flex-row justify-center items-center">
								<button
									onClick={useButtonHandler}
									className="bg-Flamingo-Pink ml-8 py-2 px-14 rounded-full border-4 border-Flamingo-Pink hover:text-Flamingo-Pink hover:border-Flamingo-Pink hover:bg-white text-white font-bold text-xl"
								>
									Use
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default UseItemModal
