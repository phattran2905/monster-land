import acceleratingBattery from '@assets/img/items/accelerating-battery.png'
import attackBoostingPotion from '@assets/img/items/attack-boosting-potion.png'
import defenseBoostingPotion from '@assets/img/items/defense-boosting-potion.png'
import expBoostingSerum from '@assets/img/items/exp-boosting-serum.png'
import { Item } from '@type/item'
import Image, { StaticImageData } from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { FaArrowAltCircleUp, FaShoppingBasket, FaSplotch } from 'react-icons/fa'

interface ItemCardProps extends Item {
	setOpenModal: Dispatch<SetStateAction<boolean>>
}

const itemImages: { [key: string]: StaticImageData } = {
	['accelerating-battery']: acceleratingBattery,
	['attack-boosting-potion']: attackBoostingPotion,
	['defense-boosting-potion']: defenseBoostingPotion,
	['exp-boosting-serum']: expBoostingSerum,
}

const ItemCard = ({
	amount = 0,
	effect_property,
	effect_value,
	image,
	name,
	setOpenModal,
	uid,
}: ItemCardProps) => {
	return (
		<div className="md:h-[21rem] flex flex-row border-2 border-Royal-Blue hover:shadow-lg hover:shadow-Amethyst-Purple">
			<div className="w-60 h-full flex flex-col border-r-2 border-r-Royal-Blue">
				<div className="w-full p-4 h-5/6 relative">
					<Image
						alt={name || ''}
						className="w-full h-full object-scale-down"
						fill
						src={itemImages[image] as StaticImageData}
					/>
				</div>
				<div className="w-full h-1/6 bg-Royal-Blue flex flex-col items-stretch justify-center">
					<span className="text-white font-bold text-center text-lg">
						{name}
					</span>
				</div>
			</div>

			{/* Info */}
			<div className="w-52 h-full flex flex-col justify-between items-stretch border-l-2 border-l-Royal-Blue">
				<div className="w-full bg-white py-4 px-6">
					<div className="flex flex-col mb-3">
						<div className="flex flex-row items-center mb-1">
							<FaSplotch
								className="text-Flamingo-Pink"
								size={16}
							/>
							<span className="ml-1 font-bold capitalize">Effect</span>
						</div>
						<div className="bg-Midnight-Gray border-2 border-Indigo-Blue rounded-lg flex flex-row justify-center">
							<span className="p-1 font-bold text-white tracking-widest capitalize">
								Boost {effect_property}
							</span>
						</div>
					</div>
					<div className="flex flex-col mb-3">
						<div className="flex flex-row items-center mb-1">
							<FaArrowAltCircleUp
								className="text-Flamingo-Pink"
								size={16}
							/>
							<span className="ml-1 font-bold capitalize">Effect Value</span>
						</div>
						<div className="bg-Midnight-Gray border-2 border-Indigo-Blue rounded-lg flex flex-row justify-center">
							<span className="p-1 font-bold text-white tracking-widest capitalize">
								{effect_property === 'incubator' ? (
									<>{`-${effect_value} seconds`}</>
								) : (
									<>{`+${effect_value}`}</>
								)}
							</span>
						</div>
					</div>
					<div className="flex flex-col mb-3">
						<div className="flex flex-row items-center mb-1">
							<FaShoppingBasket
								className="text-Flamingo-Pink"
								size={16}
							/>
							<span className="ml-1 font-bold capitalize">Amount</span>
						</div>
						<div className="bg-Midnight-Gray border-2 border-Indigo-Blue rounded-lg flex flex-row justify-center">
							<span className="p-1 font-bold text-white tracking-widest capitalize">
								{amount}
							</span>
						</div>
					</div>
				</div>
				{/* Button */}
				<div className="flex flex-row items-stretch w-full p-2">
					<button
						className="w-full p-2 bg-Flamingo-Pink text-white font-bold rounded-full border-4 border-Flamingo-Pink hover:bg-white hover:text-Flamingo-Pink"
						onClick={() => {
							setOpenModal(true)
              
							// onSelect({
							// 	amount,
							// 	effect_property,
							// 	effect_value,
							// 	img_name,
							// 	name,
							// 	uid,
							// })
						}}
					>
						Use
					</button>
				</div>
			</div>
		</div>
	)
}
export default ItemCard
