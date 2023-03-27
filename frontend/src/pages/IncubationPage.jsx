import { useState, useEffect } from "react"
import Header from "../components/Header"
import IncubatorCard from "../components/incubator/IncubatorCard"
import MenuBar from "../components/menu/MenuBar"
import BoostIncubatorModal from "../components/modal/BoostIncubatorModal"

const incubatorMachines = [
	{ id: "Inc-01", name: "Incubator #1", in_use: true },
	{ id: "Inc-02", name: "Incubator #2", in_use: false },
]

function IncubationPage() {
	const [incubators, setIncubators] = useState(incubatorMachines)
	const [showBoostModal, setShowBoostModal] = useState(false)

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row relative overflow-hidden">
				<MenuBar />

				<div className="m-10 w-full  flex flex-row justify-between items-center">
					{incubators.map((incubator) => (
						<IncubatorCard
							incubator={incubator}
							onShowBoostModal={() => setShowBoostModal(true)}
						/>
					))}

					{/* Modals */}
					{showBoostModal && (
						<BoostIncubatorModal
							onClose={() => setShowBoostModal(false)}
							onConfirm={() => {}}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default IncubationPage
