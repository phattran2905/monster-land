'use client'

import Loading from '@components/Loading'
import Tab from '@components/Tab'
import { useState } from 'react'
import { AiFillWarning } from 'react-icons/ai'
import { FaEgg } from 'react-icons/fa'
import { RiTempColdFill } from 'react-icons/ri'

interface Props {
	backpackData: any
}

const tabs = {
	content: [
		{
			amount: 1,
			hatching_time_in_seconds: 0,
			img_name: 'egg_1',
			monster_type: 'fire',
			name: 'Fire Egg',
			uid: '1',
		},
    
	],
	headers: [
		{ icon: FaEgg, label: 'Eggs' },
		{ icon: RiTempColdFill, label: 'Items' },
	],
}

const BackpackPage = ({ backpackData }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	const [eggs, setEggs] = useState([])
	const [items, setItems] = useState([])
	const [activeTab, setActiveTab] = useState('eggs')
	const [confirmIncubateModal, setConfirmIncubateModal] = useState(false)
	const [confirmItemUseModal, setConfirmItemUseModal] = useState(false)
	const [selectedEgg, setSelectedEgg] = useState<any>('')
	const [selectedItem, setSelectedItem] = useState('')
	const [error, setError] = useState<string | undefined>()

	return (
		<section className="relative h-full flex items-stretch">
			<div className="p-2 sm:p-4 md:p-8 w-full">
				{/* Modals */}
				{/*
      //TODO: Abstract this component
      {confirmIncubateModal && (
				<IncubationConfirmModal
					eggName={selectedEgg?.name}
					onClose={() => setConfirmIncubateModal(false)}
					onConfirm={() => incubateEggByUID(selectedEgg?.uid)}
				/>
			)}
      //TODO: Abstract this component
			{confirmItemUseModal && (
				<UseItemModal
					// onConfirm={() => incubateEggByUID(selectedEgg?.uid)}
					itemToUse={selectedItem}
					onClose={() => setConfirmItemUseModal(false)}
					onUse={onUseItem}
				/>
			)}*/}

				{/* Content */}
				{isLoading ? <Loading type="circle" /> : <Tab data={tabs} />}
			</div>
		</section>
	)
}
export default BackpackPage
