import { useState, useEffect } from "react"
import Header from "../components/Header"
import IncubatorCard from "../components/incubator/IncubatorCard"
import MenuBar from "../components/menu/MenuBar"

const incubatorMachines = [
	{ id: "Inc-01", name: "Incubator #1", in_use: true },
	{ id: "Inc-02", name: "Incubator #2", in_use: false },
]

function IncubationPage() {
	const [incubators, setIncubators] = useState(incubatorMachines)

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row relative overflow-hidden">
				<MenuBar />

				<div className="m-10 w-full  flex flex-row justify-between items-center">
					{incubators.map((incubator) => (
						<IncubatorCard incubator={incubator} />
					))}
				</div>
			</div>
		</div>
	)
}

export default IncubationPage
