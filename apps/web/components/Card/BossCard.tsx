import bossImage from '@assets/img/challenges/boss-1.png'
import HealthBar from '@components/HealthBar'
import MonsterType from '@components/MonsterType'
import Image from 'next/image'
import { GiBroadsword, GiLightningShield } from 'react-icons/gi'
import { MdOutlineCategory } from 'react-icons/md'

interface BossCardProps {
	boss?: {
		boss_attack: number
		boss_defense: number
		boss_img_name: string
		boss_name: string
	}
	health?: number
	isWinner?: boolean
}
const BossCard = ({ boss, health = 50, isWinner }: BossCardProps) => {
	return (
		<div className="flex flex-col">
			<div
				className={`bg-white shadow-lg mx-4 rounded-xl  shadow-Fire-Engine-Red relative`}
			>
				{/* Badge */}
				{isWinner && (
					<div className="absolute top-0 -left-6 bg-Forest-Green rounded-xl px-8 py-2 -rotate-[40deg] shadow-Fresh-Green shadow-lg">
						<span className="text-white font-bold">Winner</span>
					</div>
				)}

				{/* Name */}
				<h3
					className={`rounded-tl-xl rounded-tr-xl bg-Indigo-Blue py-3 text-white font-bold text-xl text-center`}
				>
					{boss?.boss_name}
				</h3>
				{/* Boss Image */}
				<div className={`bg-light-white w-full p-4`}>
					<Image
						alt="boss"
						className="w-full object-scale-down"
						src={bossImage}
					/>
				</div>
				{/* Stats */}
				<div className={`flex flex-col items-center py-2`}>
					<div className="w-2/3 flex flex-row my-2 justify-between items-center">
						<div className="flex flex-row items-center">
							<MdOutlineCategory
								className="text-Fire-Engine-Red font-bold"
								size={20}
							/>
							<span className="ml-1 capitalize">Type</span>
						</div>
						<MonsterType name={'water'} />
					</div>

					<div className="w-2/3 flex flex-row my-2 justify-between items-center">
						<div className="flex flex-row items-center">
							<GiBroadsword
								className="text-Fire-Engine-Red font-bold"
								size={20}
							/>
							<span className="ml-1 capitalize">Attack</span>
						</div>
						<div className="bg-Midnight-Gray flex flex-row justify-center w-20 rounded-xl">
							<span className="p-1 font-bold text-white capitalize">
								{boss?.boss_attack}
							</span>
						</div>
					</div>

					<div className="w-2/3 flex flex-row my-2 justify-between items-center">
						<div className="flex flex-row items-center">
							<GiLightningShield
								className="text-Fire-Engine-Red font-bold"
								size={20}
							/>
							<span className="ml-1 capitalize">Defense</span>
						</div>
						<div className="bg-Midnight-Gray flex flex-row justify-center w-20 rounded-xl">
							<span className="p-1 font-bold text-white capitalize">
								{boss?.boss_defense}
							</span>
						</div>
					</div>
				</div>
			</div>

			<HealthBar percentage={health} />
		</div>
	)
}
export default BossCard
