import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from '@components/Footer'
import Header from '@components/Header'
import Sidebar from '../components/sidebar/Sidebar'
import BoostIncubatorModal from '../components/modal/BoostIncubatorModal'
import HatchModal from '../components/modal/HatchModal'
import SelectEggModal from '../components/modal/SelectEggModal'
import { useGetBackpackQuery } from '../redux/services/backpack'
import { useIncubateEggMutation } from '../redux/services/incubation'
import Incubators from '../components/incubator/Incubators'
import { selectIncubator, updateIncubator } from '../redux/slices/incubators'

function IncubationPage() {
	const authState = useSelector((state: any) => state.auth)
	const incubatorState = useSelector((state: any) => state.incubators)
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
		document.title = 'Monster Land - Incubation'
	}, [])

	// Redirect to login if not logged in
	useEffect(() => {
		if (!authState.isLoggedIn) {
			return navigate('/login')
		}
	}, [authState.isLoggedIn])

	const onStartIncubating = async (eggUID: string) => {
		if (eggUID) {
			const incubationResult: any = await incubateEgg({
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
		<div className="w-full flex flex-row items-stretch">
			<Sidebar />
			<div className="flex flex-col w-full">
				<Header />

				<div className="p-2 sm:p-4 md:p-16 w-full h-full flex flex-row justify-between md:items-center relative md:gap-x-12">
					<Incubators
						setNewMonster={setNewMonster}
						onShowBoostModal={() => setShowBoostModal(true)}
						onShowSelectEggModal={() => setShowSelectEggModal(true)}
						setShowHatchModal={setShowHatchModal}
					/>

					{/* Modals */}
					{showBoostModal && (
						<BoostIncubatorModal onClose={() => setShowBoostModal(false)} />
					)}

					{showHatchModal && (
						<HatchModal
							monster={newMonster}
							onClose={() => {
								setShowHatchModal(false)
							}}
							onNext={() => navigate('/collection')}
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

				<div className="mt-auto">
					<Footer />
				</div>
			</div>
		</div>
	)
}

export default IncubationPage
