import { AiFillWarning } from "react-icons/ai"
import { FaTimesCircle } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { useSkipIncubationMutation } from "../../redux/services/incubation"
import { resetIncubator, updateIncubator } from "../../redux/slices/incubators"

function BoostIncubatorModal({ onClose, setNewMonster, setShowHatchModal }) {
	const authState = useSelector((state) => state.auth)
	const incubatorState = useSelector((state) => state.incubators)
	const [fetchSkipAPI] = useSkipIncubationMutation()
	const trainerState = useSelector((state) => state.trainer)
    const dispatch = useDispatch()
	const [selectedIncubation, setSelectedIncubation] = useState(
		() => incubatorState[`incubator${incubatorState.selectedIndex}`]
	)
	const [coinsToSkip, setCoinsToSkip] = useState(0)
	const [error, setError] = useState()

	useEffect(() => {
		if (selectedIncubation) {
			console.log(selectedIncubation)
			const skippingFee = 100 * selectedIncubation?.hatching_time_in_seconds
			setCoinsToSkip(skippingFee)
		}
	}, [selectedIncubation])

	const onConfirm = async () => {
		if (error) {
			return
		}

		setError()
		// Check whether trainer can afford for the skip
		if (trainerState.gold < coinsToSkip) {
			setError("You do not have enough coins.")
			return
		}

		const skipResult = await fetchSkipAPI({
			jwt_token: authState.jwtToken,
			incubation_uid: selectedIncubation?.uid,
		})
        
		if (skipResult?.data) {
			dispatch(resetIncubator(selectedIncubation.index))
            onClose()
		} else if (skipResult?.error) {
            setError(skipResult?.error.data.message)
		}
	}

	return (
		<div className="w-full h-full absolute left-0 bg-white flex flex-row justify-center items-center bg-opacity-80">
			<div className="relative w-1/3 shadow-2xl flex flex-col bg-white rounded-2xl">
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
					<h2 className="text-white font-bold text-xl">Confirm to skip</h2>
				</div>

				{/* Content */}
				<div className="flex flex-col justify-between py-10 items-center mx-6 my-6">
					<p className="text-lg mb-2">
						It will cost you{" "}
						<span className="text-Flamingo-Pink font-bold">{coinsToSkip} coins</span> to
						finish the incubation.
					</p>
					<p className="text-lg mb-1">Do you want to proceed?</p>

					{/* Error */}
					{error ? (
						<div className="bg-Fire-Engine-Red py-2 px-4 mt-2 rounded-md">
							<p className="text-lg font-bold text-white flex flex-row items-center">
								<AiFillWarning className="text-white mx-1" />
								{error}
							</p>
						</div>
					) : (
						<div className="w-full flex flex-row justify-center items-center mt-12">
							<button
								onClick={onConfirm}
								className="bg-Flamingo-Pink py-2 px-8 rounded-full hover:bg-Indigo-Blue"
							>
								<span className="text-white font-bold text-xl">Confirm</span>
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
export default BoostIncubatorModal
