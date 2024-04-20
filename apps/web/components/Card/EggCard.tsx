import eggImage from '@assets/img/eggs/aqua-glow-egg.png'
import MonsterType from '@components/MonsterType'
import Image from 'next/image'
import { FaClock, FaShoppingBasket } from 'react-icons/fa'
import { MdOutlineCategory } from 'react-icons/md'

interface Props {
	amount?: number
	hatchingTime?: number
	img_name?: string
	monster_type?: string
	name?: string
	uid?: string
}
const EggCard = ({
	amount = 0,
	hatchingTime = 0,
	img_name = '',
	monster_type = 'electric',
	name = '',
	uid = '',
}: Props) => {
	return (
		<div className="md:h-[21rem] flex flex-row border-2 border-Royal-Blue hover:shadow-lg hover:shadow-Amethyst-Purple">
			{/* Name & Image */}
			<div className="w-60 h-full flex flex-col border-r-2 border-r-Royal-Blue">
				<div className="w-full p-4 h-5/6 relative">
					<Image
						alt={name || ''}
						className="w-full h-full object-scale-down"
						fill
						src={eggImage}
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
							<FaClock
								className="text-Flamingo-Pink"
								size={16}
							/>
							<span className="ml-1 font-bold capitalize">Hatching time</span>
						</div>
						<div className="bg-Midnight-Gray border-2 border-Indigo-Blue rounded-lg flex flex-row justify-center">
							<span className="p-1 font-bold text-white tracking-widest">
								{hatchingTime}
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
							<span className="p-1 font-bold text-white tracking-widest">
								{amount}
							</span>
						</div>
					</div>
					<div className="flex flex-col mb-3">
						<div className="flex flex-row items-center mb-1">
							<MdOutlineCategory
								className="text-Fire-Engine-Red font-bold"
								size={16}
							/>
							<span className="ml-1 font-bold capitalize">Monster Type</span>
						</div>
						<div className="flex flex-row justify-center items-stretch">
							<MonsterType name={monster_type} />
						</div>
					</div>
				</div>
				{/* Button */}
				<div className="flex flex-row items-stretch w-full p-2">
					<button
						className="w-full p-2 bg-Flamingo-Pink text-white font-bold rounded-full border-4 border-Flamingo-Pink hover:bg-white hover:text-Flamingo-Pink"
						// onClick={() => onSelect({ img_name, name, uid })}
					>
						Incubate
					</button>
				</div>
			</div>
		</div>
	)
}
export default EggCard
