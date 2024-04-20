'use client'

import IncubatorCard from '@components/Card/IncubatorCard'

interface IncubationPageProps {}
const IncubationPage = ({}: IncubationPageProps) => {
	return (
		<section className="relative h-full flex items-stretch">
			<div className="p-2 sm:p-4 md:p-16 w-full h-full flex flex-row justify-between md:items-center relative md:gap-x-12">
				{/* Incubator #1 */}
				<IncubatorCard
					// incubator={incubatorsState.incubator1}
					index={1}
					name="Incubator #1"
					// onDoneIncubating={onDoneIncubating}
					// onShowBoostModal={() => {
					// 	dispatch(selectIncubator(1))
					// 	onShowBoostModal(true)
					// }}
					// onShowSelectEggModal={onShowSelectEggModal}
				/>

				{/* Incubator #2 */}
				<IncubatorCard
					// incubator={incubatorsState.incubator2}
					index={2}
					name="Incubator #2"
					// onDoneIncubating={onDoneIncubating}
					// onShowBoostModal={() => {
					// 	dispatch(selectIncubator(2))
					// 	onShowBoostModal(true)
					// }}
					// onShowSelectEggModal={onShowSelectEggModal}
				/>

				{/* <Incubators
				onShowBoostModal={() => setShowBoostModal(true)}
				onShowSelectEggModal={() => setShowSelectEggModal(true)}
				setNewMonster={setNewMonster}
				setShowHatchModal={setShowHatchModal}
			/>

			 // Modals
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
			)} */}
			</div>
		</section>
	)
}
export default IncubationPage
