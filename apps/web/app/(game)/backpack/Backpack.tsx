'use client'

import { EggCard, ItemCard } from '@components/Card'
import Modal from '@components/Modal'
import { Card, CardContent, CardFooter } from '@components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { BackpackType } from '@type/backpack'
import { Egg } from '@type/egg'
import { Item } from '@type/item'
import { useState } from 'react'
import { FaEgg } from 'react-icons/fa'
import { RiTempColdFill } from 'react-icons/ri'

const Amount = ({ amount = 0, capacity = 0 }) => {
	return (
		<div className="bg-Midnight-Gray inline-block rounded-full px-10 py-2 my-3">
			<span className="text-Gold-Sand font-bold">{amount}</span>
			<span className="text-white">/{capacity}</span>
		</div>
	)
}

const Backpack = ({
	egg_capacity,
	eggs,
	item_capacity,
	items,
	uid,
}: BackpackType) => {
	const [openModal, setOpenModal] = useState(false)

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
						<CardContent className="space-y-2 flex flex-wrap">
							{eggs?.length === 0 && (
								<div className="h-full w-full flex flex-row justify-center items-center">
									<span className="inline-block text-Dim-Gray bg-Anti-flash-white font-bold py-2 px-10 rounded-full italic my-auto">
										You have no eggs
									</span>
								</div>
							)}
							{eggs?.map((egg: Egg) => (
								<EggCard
									key={egg.uid}
									{...egg}
									setOpenModal={setOpenModal}
								/>
							))}
						</CardContent>
						<CardFooter>
							<Amount
								amount={eggs?.length}
								capacity={egg_capacity}
							/>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="items">
					<Card>
						<CardContent className="space-y-2 flex flex-wrap">
							{items?.length === 0 && (
								<div className="h-full w-full flex flex-row justify-center items-center">
									<span className="inline-block text-Dim-Gray bg-Anti-flash-white font-bold py-2 px-10 rounded-full italic my-auto">
										You have no items
									</span>
								</div>
							)}
							{items?.map((item: Item) => (
								<ItemCard
									key={item.uid}
									{...item}
									setOpenModal={setOpenModal}
								/>
							))}
						</CardContent>
						<CardFooter>
							<Amount
								amount={items.length}
								capacity={item_capacity}
							/>
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
