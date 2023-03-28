import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import IncubatorCard from "../components/incubator/IncubatorCard"
import MenuBar from "../components/menu/MenuBar"
import BoostIncubatorModal from "../components/modal/BoostIncubatorModal"
import HatchModal from "../components/modal/HatchModal"
import SelectEggModal from "../components/modal/SelectEggModal"
import { useGetBackpackQuery } from "../redux/services/backpack"
import {
	useGetIncubatingEggsQuery,
	useHatchEggMutation,
	useIncubateEggMutation,
} from "../redux/services/incubation"

function IncubationPage() {
	const authState = useSelector((state) => state.auth)
	const navigate = useNavigate()
	const { data: incubatingEggs, refetch: refetchIncubation } = useGetIncubatingEggsQuery({
		jwt_token: authState.jwtToken,
	})
	const { refetch: refetchBackpack } = useGetBackpackQuery({
		jwt_token: authState.jwtToken,
	})
	const [hatchEgg] = useHatchEggMutation()
	const [incubateEgg] = useIncubateEggMutation()
	const [incubator1, setIncubator1] = useState({
		uid: "Inc-01",
		name: "Incubator #1",
		in_use: false,
		done: false,
	})
	const [incubator2, setIncubator2] = useState({
		uid: "Inc-02",
		name: "Incubator #2",
		in_use: false,
		done: false,
	})
	const [showBoostModal, setShowBoostModal] = useState(false)
	const [showHatchModal, setShowHatchModal] = useState(false)
	const [showSelectEggModal, setShowSelectEggModal] = useState(false)
	const [newMonster, setNewMonster] = useState({})

	useEffect(() => {
		// refetchIncubation()
	}, [])

	// Redirect to login if not logged in
	useEffect(() => {
		if (!authState.isLoggedIn) {
			return navigate("/login")
		}
	}, [authState.isLoggedIn])

	useEffect(() => {
		if (incubatingEggs?.length > 0) {
			const incubations = incubatingEggs.slice(0, 2)

			setIncubator1((prev) => ({
				...prev,
				...incubations[0],
				in_use: incubations[0] ? true : false,
			}))

			setIncubator2((prev) => ({
				...prev,
				...incubations[1],
				in_use: incubations[1] ? true : false,
			}))
		}
	}, [incubatingEggs])

	const onDoneIncubating = async (incubationUID) => {
		if (incubationUID) {
			const babyMonster = await hatchEgg({
				jwt_token: authState.jwtToken,
				incubation_uid: incubationUID,
			})
			// Set new monster data
			if (babyMonster?.data) {
				setNewMonster(babyMonster?.data)
			}

			refetchIncubation()
			setShowHatchModal(true)
		}
	}

	const onStartIncubating = async (eggUID) => {
		if (eggUID) {
			const incubationResult = await incubateEgg({
				jwt_token: authState.jwtToken,
				egg_uid: eggUID,
			})
			// Set new monster data
			if (incubationResult?.data) {
				refetchIncubation()
				refetchBackpack()
				setShowSelectEggModal(false)
			}
		}
	}

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row overflow-hidden">
				<MenuBar />

				<div className="m-10 w-full flex flex-row justify-between items-center relative gap-x-10">
					{/* Incubator #1 */}
					<IncubatorCard
						incubator={incubator1}
						onShowBoostModal={() => setShowBoostModal(true)}
						onShowSelectEggModal={() => setShowSelectEggModal(true)}
						onDoneIncubating={onDoneIncubating}
					/>

					{/* Incubator #2 */}
					<IncubatorCard
						incubator={incubator2}
						onShowBoostModal={() => setShowBoostModal(true)}
						onShowSelectEggModal={() => setShowSelectEggModal(true)}
						onDoneIncubating={onDoneIncubating}
					/>

					{/* Modals */}
					{showBoostModal && (
						<BoostIncubatorModal
							onClose={() => setShowBoostModal(false)}
							onConfirm={() => {}}
						/>
					)}

					{showHatchModal && (
						<HatchModal
							monster={newMonster}
							onClose={() => {
								setShowHatchModal(false)
								// refetchIncubation()
							}}
							onNext={() => navigate("/collection")}
						/>
					)}

					{showSelectEggModal && (
						<SelectEggModal
							onClose={() => setShowSelectEggModal(false)}
							onStartIncubating={onStartIncubating}
						/>
					)}
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default IncubationPage
