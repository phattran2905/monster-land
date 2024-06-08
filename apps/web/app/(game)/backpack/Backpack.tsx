'use client'

import { EggCard } from '@components/Card'
import Modal from '@components/Modal'
import { Card, CardContent, CardFooter } from '@components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { useState } from 'react'
import { FaEgg } from 'react-icons/fa'
import { RiTempColdFill } from 'react-icons/ri'

interface Props {
	backpack: any
}

const Amount = ({ amount = 0, capacity = 0 }) => {
	return (
		<div className="bg-Midnight-Gray inline-block rounded-full px-10 py-2 my-3">
			<span className="text-Gold-Sand font-bold">{amount}</span>
			<span className="text-white">/{capacity}</span>
		</div>
	)
}

const Backpack = ({ backpack }: Props) => {
	const [openModal, setOpenModal] = useState(false)
	console.log(backpack)
	return (
		<>
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
								<EggCard setOpenModal={setOpenModal} />
							</div>
						</CardContent>
						<CardFooter>
							<Amount capacity={backpack?.egg_capacity} />
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
							<Amount capacity={backpack?.item_capacity} />
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
			<Modal
				onOpenChange={setOpenModal}
				open={openModal}
				type="backpack"
			/>
		</>
	)
}
export default Backpack
