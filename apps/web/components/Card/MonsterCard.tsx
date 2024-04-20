import monsterImage from '@assets/img/monsters/bouldersmash.png'
import MonsterType from '@components/MonsterType'
import ProgressBar from '@components/ProgressBar'
import Image from 'next/image'
import { AiOutlineNumber } from 'react-icons/ai'
import { FaAngleDoubleUp, FaChessRook } from 'react-icons/fa'
import { GiBroadsword, GiLightningShield } from 'react-icons/gi'
import { MdOutlineCategory } from 'react-icons/md'

interface Props {
	attack?: number
	defense?: number
	exp?: number
	img_name?: string
	level?: number
	level_up_exp?: number
	name?: string
	type?: string
	uid?: string
}
const MonsterCard = ({
	attack = 0,
	defense = 0,
	exp = 0,
	img_name,
	level = 1,
	level_up_exp = 100,
	name = '',
	type = 'fire',
	uid = '',
}: Props) => {
	return (
		<div className="flex flex-row border-2 border-Royal-Blue hover:shadow-lg hover:shadow-Amethyst-Purple">
			{/* Name & Image */}
			<div className="w-60 h-full flex flex-col border-r-2 border-r-Royal-Blue">
				<div className="w-full p-4 h-5/6 relative">
					<Image
						alt={name || ''}
						className="w-full h-full object-scale-down"
						src={monsterImage}
					/>
				</div>
				<div className="w-full h-1/6 bg-Royal-Blue flex flex-col items-stretch justify-center">
					<span className="text-white font-bold text-center text-lg">
						{name}
					</span>
				</div>
			</div>

			{/* Stats */}
			<div className="w-60 h-full p-4 flex flex-col justify-between items-stretch border-l-2 border-l-Royal-Blue">
				<div className="flex flex-row mb-3 justify-between items-center">
					<div className="flex flex-row items-center mb-1">
						<AiOutlineNumber
							className="text-Fire-Engine-Red font-bold"
							size={20}
						/>
						<span className="ml-1 capitalize">UID</span>
					</div>
					<div className="bg-Midnight-Gray rounded-lg flex flex-row justify-center w-32">
						<span className="p-1 font-bold text-white capitalize">{uid}</span>
					</div>
				</div>
				<div className="flex flex-row mb-3 justify-between items-center">
					<div className="flex flex-row items-center mb-1">
						<FaChessRook
							className="text-Fire-Engine-Red font-bold"
							size={20}
						/>
						<span className="ml-1 capitalize">Level</span>
					</div>
					<div className="bg-Midnight-Gray rounded-lg flex flex-row justify-center w-20">
						<span className="p-1 font-bold text-white capitalize">{level}</span>
					</div>
				</div>
				<div className="flex flex-row mb-3 justify-between items-center">
					<div className="flex flex-row items-center mb-1">
						<MdOutlineCategory
							className="text-Fire-Engine-Red font-bold"
							size={20}
						/>
						<span className="ml-1 capitalize">Type</span>
					</div>
					<MonsterType name={type} />
				</div>

				<div className="flex flex-row mb-3 justify-between items-center">
					<div className="flex flex-row items-center mb-1">
						<GiBroadsword
							className="text-Fire-Engine-Red font-bold"
							size={20}
						/>
						<span className="ml-1 capitalize">Attack</span>
					</div>
					<div className="bg-Midnight-Gray rounded-lg flex flex-row justify-center w-20">
						<span className="p-1 font-bold text-white capitalize">
							{attack}
						</span>
					</div>
				</div>

				<div className="flex flex-row mb-3 justify-between items-center">
					<div className="flex flex-row items-center mb-1">
						<GiLightningShield
							className="text-Fire-Engine-Red font-bold"
							size={20}
						/>
						<span className="ml-1 capitalize">Defense</span>
					</div>
					<div className="bg-Midnight-Gray rounded-lg flex flex-row justify-center w-20">
						<span className="p-1 font-bold text-white capitalize">
							{defense}
						</span>
					</div>
				</div>

				<div className="flex flex-col justify-between items-stretch">
					<div className="flex flex-row items-center mb-1">
						<FaAngleDoubleUp
							className="text-Flamingo-Pink"
							size={20}
						/>
						<span className="ml-1 capitalize">Exp</span>
					</div>
					<div className="flex flex-col justify-center w-full pt-1">
						<ProgressBar
							classNames={{
								background: 'bg-Light-Gray',
								current: 'bg-Forest-Green',
							}}
							percentage={Math.floor((exp / level_up_exp) * 100)}
						/>
						<div className="flex flex-row justify-end items-center mt-2">
							<p className="text-sm font-bold">
								<span className="text-sm text-Forest-Green font-bold">
									{exp}
								</span>
								{' / '}
								{level_up_exp}
							</p>
						</div>
					</div>
				</div>

				{/* <button
      className="p-2 bg-Flamingo-Pink mt-1 text-white font-bold rounded-full hover:bg-Gold-Sand hover:text-Midnight-Gray"
      onClick={() => onSelect()}
    >
      Assign
    </button> */}
			</div>
		</div>
	)
}
export default MonsterCard
