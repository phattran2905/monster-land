import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHatchEggMutation, useGetIncubatingEggsQuery } from "../../redux/services/incubation"
import IncubatorCard from "./IncubatorCard"
import { resetIncubator, updateIncubator } from "../../redux/slices/incubators"

function Incubators({ onShowBoostModal, onShowSelectEggModal, setNewMonster, setShowHatchModal }) {
	const authState = useSelector((state) => state.auth)
	const incubatorsState = useSelector((state) => state.incubators)
	const { data: incubatingEggs } = useGetIncubatingEggsQuery({
		jwt_token: authState.jwtToken,
	})
	const dispatch = useDispatch()
	const [hatchEgg] = useHatchEggMutation()

	useEffect(() => {
		if (incubatingEggs?.length > 0) {
			const incubation = incubatingEggs.slice(0, 2)

			if (incubatorsState.selectedIndex === 0) {
				dispatch(updateIncubator({ incubation: incubation }))
			}
		}
	}, [incubatingEggs])

	const onDoneIncubating = async (incubationUID, incubatorIndex) => {
		if (incubationUID) {
			const babyMonster = await hatchEgg({
				jwt_token: authState.jwtToken,
				incubation_uid: incubationUID,
			})
			// Set new monster data
			if (babyMonster?.data) {
				setNewMonster(babyMonster?.data)
			}

			const updatedIncubator =
				incubatorIndex === 1 ? incubatorsState.incubator1 : incubatorsState.incubator2

			// dispatch(updateIncubator({ incubation: { ...updatedIncubator } }))
			dispatch(resetIncubator(incubatorIndex))

			setShowHatchModal(true)
		}
	}

	return (
		<>
			{/* Incubator #1 */}
			<IncubatorCard
				name="Incubator #1"
				index={1}
				incubator={incubatorsState.incubator1}
				onShowBoostModal={onShowBoostModal}
				onShowSelectEggModal={onShowSelectEggModal}
				onDoneIncubating={onDoneIncubating}
			/>

			{/* Incubator #2 */}
			<IncubatorCard
				name="Incubator #2"
				index={2}
				incubator={incubatorsState.incubator2}
				onShowBoostModal={onShowBoostModal}
				onShowSelectEggModal={onShowSelectEggModal}
				onDoneIncubating={onDoneIncubating}
			/>
		</>
	)
}
export default Incubators
