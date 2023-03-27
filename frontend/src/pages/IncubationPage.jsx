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
import { useGetIncubatingEggsQuery, useHatchEggMutation } from "../redux/services/incubation"

function IncubationPage() {
	const authState = useSelector((state) => state.auth)
	const navigate = useNavigate()
	const { data: incubatingEggs, refetch } = useGetIncubatingEggsQuery({
		jwt_token: authState.jwtToken,
	})
	const [hatchEgg] = useHatchEggMutation()
	const [incubators, setIncubators] = useState([
		{ uid: "Inc-01", name: "Incubator #1", in_use: false, done: false },
		{ uid: "Inc-02", name: "Incubator #2", in_use: false, done: false },
	])
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
		refetch()
	}, [])

	// Redirect to login if not logged in
	useEffect(() => {
		if (!authState.isLoggedIn) {
			return navigate("/login")
		}
	}, [authState.isLoggedIn])

	useEffect(() => {
		if (incubatingEggs) {
			const incubations = incubatingEggs.slice(0, 2)

			setIncubator1({
				...incubator1,
				...incubations[0],
				in_use: incubations[0]?.status === "incubating",
				done: incubations[0]?.status === "done",
			})
			setIncubator2({
				...incubator2,
				...incubations[1],
				in_use: incubations[1]?.status === "incubating",
				done: incubations[1]?.status === "done",
			})
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

			// Update incubators
			const updatedIncubators = incubators.map((inc, index) => {
				if (inc.uid === incubationUID) {
					return {
						uid: `Inc-${index}`,
						name: inc.name,
						in_use: false,
						done: false,
					}
				}

				return inc
			})

			setShowHatchModal(true)
			setIncubators(updatedIncubators)
		}
	}

	const onStartIncubating = (eggUID) => {

    }

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row overflow-hidden">
				<MenuBar />

				<div className="m-10 w-full flex flex-row justify-between items-center relative gap-x-10">

					{/* Incubator #1 */}
					<IncubatorCard
						key={incubator1.uid}
						incubator={incubator1}
						onShowBoostModal={() => setShowBoostModal(true)}
						onShowSelectEggModal={() => setShowSelectEggModal(true)}
						onDoneIncubating={onDoneIncubating}
					/>

					{/* Incubator #2 */}
					<IncubatorCard
						key={incubator2.uid}
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
			<Footer />
		</div>
	)
}

export default IncubationPage
