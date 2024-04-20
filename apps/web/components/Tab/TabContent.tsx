import { EggCard, ItemCard } from '@components/Card'
import TabFooter from '@components/Tab/TabFooter'
import React, { useState } from 'react'

interface TabContentProps {
	activeTab?: string
	backpackData?: any
	tabs?: any[]
}

const TabContent = ({ activeTab, backpackData, tabs }: TabContentProps) => {
	const [eggs, setEggs] = useState([1])
	const [items, setItems] = useState([1])

	return (
		<div className="flex flex-col w-full h-full">
			{/* Items and Eggs */}
			<div className="w-full h-full p-4 md:p-8 flex md:flex-row flex-col flex-wrap content-start gap-10 overflow-auto rounded-sm bg-light-white">
				{true ? (
					eggs.length === 0 ? (
						<div className="h-full w-full flex flex-row justify-center items-center">
							<span className="inline-block text-Dim-Gray bg-Anti-flash-white font-bold py-2 px-10 rounded-full italic my-auto">
								You have no eggs
							</span>
						</div>
					) : (
						eggs.map(
							(
								item: any //TODO: Fix any
							) => (
								<EggCard />
								//TODO: Abstract this component
								// <Egg
								// 	amount={item.amount}
								// 	hatching_time_in_seconds={item.hatching_time_in_seconds}
								// 	img_name={item.img_name}
								// 	key={item.uid}
								// 	monster_type={item.monster_type}
								// 	name={item.name}
								// 	onSelect={onSelectEgg}
								// 	uid={item.uid}
								// />
							)
						)
					)
				) : items.length === 0 ? (
					<div className="h-full w-full flex flex-row justify-center items-center">
						<span className="inline-block text-Dim-Gray bg-Anti-flash-white font-bold py-2 px-10 rounded-full italic my-auto">
							You have no items
						</span>
					</div>
				) : (
					items.map(
						(
							item: any //TODO: Fix any
						) => (
							<ItemCard />
							//TODO: Abstract this component
							// <Item
							// 	amount={item.amount}
							// 	effect_property={item.effect_property}
							// 	effect_value={item.effect_value}
							// 	img_name={item.img_name}
							// 	key={item.uid}
							// 	name={item.name}
							// 	onSelect={onSelectItem}
							// 	uid={item.uid}
							// />
						)
					)
				)}
			</div>

			<TabFooter amount={{ capacity: 10, current: 0 }} />
		</div>
	)
}
export default TabContent
