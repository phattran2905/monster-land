import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import MenuBar from "../components/menu/MenuBar"
import BoostIncubatorModal from "../components/modal/BoostIncubatorModal"
import HatchModal from "../components/modal/HatchModal"
import SelectEggModal from "../components/modal/SelectEggModal"
import { useGetBackpackQuery } from "../redux/services/backpack"
import {
	useIncubateEggMutation,
} from "../redux/services/incubation"
import Incubators from "../components/incubator/Incubators"
import { selectIncubator, updateIncubator } from "../redux/slices/incubators"

function IncubationPage() {
	const authState = useSelector((state) => state.auth)
	const incubatorState = useSelector((state) => state.incubators)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { refetch: refetchBackpack } = useGetBackpackQuery({
		jwt_token: authState.jwtToken,
	})
	const [incubateEgg] = useIncubateEggMutation()
	const [showBoostModal, setShowBoostModal] = useState(false)
	const [showHatchModal, setShowHatchModal] = useState(false)
	const [showSelectEggModal, setShowSelectEggModal] = useState(false)
	const [newMonster, setNewMonster] = useState({})

	useEffect(() => {
		document.title = "Monster Land - Incubation"
	}, [])

	// Redirect to login if not logged in
	useEffect(() => {
		if (!authState.isLoggedIn) {
			return navigate("/login")
		}
	}, [authState.isLoggedIn])

	const onStartIncubating = async (eggUID) => {
		if (eggUID) {
			const incubationResult = await incubateEgg({
				jwt_token: authState.jwtToken,
				egg_uid: eggUID,
			})

			// Set incubator data
			if (incubationResult?.data) {
				refetchBackpack()
				setShowSelectEggModal(false)

				dispatch(
					updateIncubator({
						incubation: incubationResult?.data,
					})
				)
			}

			// Has error
		}
	}

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row overflow-hidden">
				<MenuBar />

				<div className="my-10 mx-20 w-full flex flex-row justify-between items-center relative gap-x-20">
					<Incubators
						setNewMonster={setNewMonster}
						onShowBoostModal={() => setShowBoostModal(true)}
						onShowSelectEggModal={() => setShowSelectEggModal(true)}
						setShowHatchModal={setShowHatchModal}
					/>

					{/* Modals */}
					{showBoostModal && (
						<BoostIncubatorModal
							onClose={() => setShowBoostModal(false)}
						/>
					)}

					{showHatchModal && (
						<HatchModal
							monster={newMonster}
							onClose={() => {
								setShowHatchModal(false)
							}}
							onNext={() => navigate("/collection")}
						/>
					)}

					{showSelectEggModal && (
						<SelectEggModal
							onClose={() => {
								dispatch(selectIncubator(0))
								setShowSelectEggModal(false)
							}}
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
