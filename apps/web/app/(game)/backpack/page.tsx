'use client'

import { EggCard } from '@components/Card'
import Loading from '@components/Loading'
import Modal from '@components/Modal'
import Tab from '@components/Tab'
import { Button } from '@components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
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

const Amount = () => {
	return (
		<div className="bg-Midnight-Gray inline-block rounded-full px-10 py-2 my-3">
			<span className="text-Gold-Sand font-bold">0</span>
			<span className="text-white">/100</span>
		</div>
	)
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
				<Tabs
					className="w-full"
					defaultValue="eggs"
				>
					<TabsList>
						<TabsTrigger value="eggs">
							<FaEgg />
							<span className="ml-1 font-bold capitalize">Eggs</span>
						</TabsTrigger>
						<TabsTrigger value="items">
							<RiTempColdFill />
							<span className="ml-1 font-bold capitalize">Items</span>
						</TabsTrigger>
					</TabsList>
					<TabsContent value="eggs">
						<Card>
							<CardContent className="space-y-2 flex flex-wrap ">
								<div className="">
									<EggCard />
								</div>
							</CardContent>
							<CardFooter>
								<Amount />
							</CardFooter>
						</Card>
					</TabsContent>
					<TabsContent value="items">
						<Card>
							<CardContent className="space-y-2">
								<div className="h-full w-full flex flex-row justify-center items-center">
									<span className="inline-block text-Dim-Gray bg-Anti-flash-white font-bold py-2 px-10 rounded-full italic my-auto">
										You have no items
									</span>
								</div>
							</CardContent>
							<CardFooter>
								<Amount />
							</CardFooter>
						</Card>
					</TabsContent>
				</Tabs>

				<Dialog>
					<DialogTrigger>
						<Button>Open</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you absolutely sure?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. This will permanently delete your
								account and remove your data from our servers.
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
				<Modal />
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
			</div>
		</section>
	)
}
export default BackpackPage
