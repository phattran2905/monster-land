import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import IncubatorCard from "../components/incubator/IncubatorCard"
import MenuBar from "../components/menu/MenuBar"
import BoostIncubatorModal from "../components/modal/BoostIncubatorModal"
import HatchModal from "../components/modal/HatchModal"
import SelectEggModal from "../components/modal/SelectEggModal"

function IncubationPage() {
	const authState = useSelector((state) => state.auth)
	const navigate = useNavigate()
	const [incubators, setIncubators] = useState([
		{ uid: "Inc-01", name: "Incubator #1", in_use: true, done: false },
		{ uid: "Inc-02", name: "Incubator #2", in_use: false, done: false },
	])
	const [showBoostModal, setShowBoostModal] = useState(false)
	const [showHatchModal, setShowHatchModal] = useState(true)
	const [showSelectEggModal, setShowSelectEggModal] = useState(false)

	// Redirect to login if not logged in
	useEffect(() => {
		if (!authState.isLoggedIn) {
			return navigate("/login")
		}
	}, [authState.isLoggedIn])

	const onDoneIncubating = (incubatorUID) => {

	}

	const onStartIncubating = (eggUID) => {

    }

	const updateIncubator = (incubatorUID, dataToUpdate) => {
		const finishedIncubator = incubators.find((i) => i.uid === incubatorUID)

		if (finishedIncubator) {
			const updatedIncubators = incubators.map((i) => {
				if (i.uid === incubatorUID) {
					return {
						...i,
						...dataToUpdate,
					}
				}

				return i
			})
			setIncubators(updatedIncubators)
		}
	}

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row  overflow-hidden">
				<MenuBar />

				<div className="m-10 w-full flex flex-row justify-between items-center relative">
					{incubators.map((incubator) => (
						<IncubatorCard
							key={incubator.uid}
							incubator={incubator}
							onShowBoostModal={() => setShowBoostModal(true)}
							onShowSelectEggModal={() => setShowSelectEggModal(true)}
						/>
					))}

					{/* Modals */}
					{showBoostModal && (
						<BoostIncubatorModal
							onClose={() => setShowBoostModal(false)}
							onConfirm={() => {}}
						/>
					)}

					{showHatchModal && (
						<HatchModal
							onClose={() => setShowHatchModal(false)}
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
		</div>
	)
}

export default IncubationPage
