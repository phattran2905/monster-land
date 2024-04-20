import bossImage from '@assets/img/challenges/boss-1.png'
import eggImage from '@assets/img/eggs/inferno-egg.png'
import itemImage from '@assets/img/items/defense-boosting-potion.png'
import GameIcon from '@components/GameIcon'
import MonsterType from '@components/MonsterType'
import ProgressBar from '@components/ProgressBar'
import Image from 'next/image'
import { FaAngleDoubleUp, FaChessRook } from 'react-icons/fa'
import { GiBroadsword, GiLightningShield } from 'react-icons/gi'
import { MdOutlineCategory } from 'react-icons/md'

interface Props {
	monster?: any
	rewardEggs?: any[]
	rewardItems?: any[]
	stage?: any
}
const Rewards = ({ monster, rewardEggs, rewardItems, stage }: Props) => {
	return (
		<div className="w-full h-full flex flex-col md:p-10 p-1 gap-y-12">
			<div className="flex md:flex-row flex-col w-full md:items-start items-center justify-between md:gap-0 gap-y-8">
				{/* Monster Card */}
				<div
					className={`md:w-1/5 sm:w-1/3 w-1/2 bg-white shadow-lg mx-4 rounded-xl shadow-Forest-Green relative`}
				>
					{/* Badge */}
					<div className="absolute top-0 -left-6 bg-Forest-Green rounded-xl px-8 py-2 -rotate-[40deg] shadow-Fresh-Green shadow-lg">
						<span className="text-white font-bold">Winner</span>
					</div>
					{/* Name */}
					<h3
						className={`rounded-tl-xl rounded-tr-xl bg-Indigo-Blue py-3 text-white font-bold text-xl text-center`}
					>
						{monster?.name}
					</h3>
					{/* Boss Image */}
					<div className={`bg-light-white w-full p-4`}>
						<Image
							alt="Boss1"
							className="w-full object-scale-down"
							src={bossImage}
						/>
					</div>
					{/* Stats */}
					<div className={`flex flex-col items-center py-2`}>
						{/* Level */}
						<div className="w-2/3 flex flex-row my-2 justify-between items-center">
							<div className="flex flex-row items-center mb-1">
								<FaChessRook
									className="text-Fire-Engine-Red font-bold"
									size={20}
								/>
								<span className="ml-1 capitalize">Level</span>
							</div>
							<div className="bg-Midnight-Gray flex flex-row justify-center w-20 rounded-xl">
								<span className="p-1 font-bold text-white capitalize">
									{monster?.level}
								</span>
							</div>
						</div>

						{/* Type */}
						<div className="w-2/3 flex flex-row my-2 justify-between items-center">
							<div className="flex flex-row items-center">
								<MdOutlineCategory
									className="text-Fire-Engine-Red font-bold"
									size={20}
								/>
								<span className="ml-1 capitalize">Type</span>
							</div>
							<MonsterType name={monster?.monster_type} />
						</div>

						{/* Attack */}
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
									{monster?.attack}
								</span>
							</div>
						</div>

						{/* Defense */}
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
									{monster?.defense}
								</span>
							</div>
						</div>

						{/* Exp */}
						<div className="w-2/3 flex flex-col my-2">
							<div className="flex flex-row items-center justify-between mb-1">
								<div className="flex flex-row items-center">
									<FaAngleDoubleUp
										className="text-Flamingo-Pink"
										size={20}
									/>
									<span className="ml-1 capitalize">Exp</span>
								</div>
								<div className="text-Forest-Green font-bold">
									+{stage?.reward_exp}
								</div>
							</div>
							<div className="flex flex-col justify-center w-full pt-1">
								<ProgressBar
									classNames={{
										background: 'bg-Light-Gray',
										current: 'bg-Forest-Green',
									}}
									percentage={Math.floor(
										(monster?.exp / monster?.level_up_exp) * 100
									)}
								/>
								<div className="flex flex-row justify-between items-center mt-1">
									<span className="text-sm text-Forest-Green font-bold">
										{monster?.exp}
									</span>
									<span className="text-sm font-bold">
										{monster?.level_up_exp}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Reward list */}
				<div className="md:w-3/4  flex flex-col border-4 border-Indigo-Blue rounded-lg">
					<h3 className="bg-Indigo-Blue text-white font-bold text-2xl py-4 px-6">
						Rewards
					</h3>

					{/* Items && Eggs */}
					<div className="flex flex-col md:flex-row w-full flex-wrap bg-white p-6">
						{rewardEggs?.map((egg) => (
							<div
								className="md:w-1/2 w-full my-6 py-4 px-12 shadow-lg"
								key={egg?.uid}
							>
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-row items-center">
										<Image
											alt="Egg1"
											className="w-14 h-14 object-scale-down"
											src={eggImage}
										/>
										<span className="text-4xl font-bold text-Royal-Blue capitalize ml-8 mr-12">
											{egg?.name}
										</span>
									</div>
									<span className="text-4xl font-bold text-Forest-Green">
										x{egg?.amount}
									</span>
								</div>
							</div>
						))}
						{rewardItems?.map((item) => (
							<div
								className="md:w-1/2 w-full my-6 py-4 px-12 shadow-lg"
								key={item?.uid}
							>
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-row items-center">
										<Image
											alt="Item1"
											className="w-14 h-14 object-scale-down"
											src={itemImage}
										/>
										<span className="text-4xl font-bold text-Royal-Blue capitalize ml-8 mr-12">
											{item?.name}
										</span>
									</div>
									<span className="text-4xl font-bold text-Forest-Green">
										x{item?.amount}
									</span>
								</div>
							</div>
						))}
					</div>

					{/* Points */}
					<div className="flex flex-col justify-center items-center p-4 w-full">
						<div className="md:w-1/3 w-1/2 flex flex-row justify-between items-center">
							<div className="flex flex-row items-center">
								<GameIcon
									className="p-3"
									type="coin"
								/>
								<span className="text-4xl font-bold text-Indigo-Blue">
									Coins
								</span>
							</div>
							<span className="text-Forest-Green text-4xl font-bold">
								+{stage?.reward_coins}
							</span>
						</div>
						<div className="md:w-1/3 w-1/2 flex flex-row justify-between items-center">
							<div className="flex flex-row items-center">
								<GameIcon
									className="p-3"
									type="pickaxe"
								/>
								<span className="text-4xl font-bold text-Indigo-Blue">
									Stamina
								</span>
							</div>
							<span className="text-Fire text-4xl font-bold">
								-{stage?.stamina_cost}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full flex flex-row justify-center items-center">
				<button
					className="py-3 px-10 bg-Midnight-Gray text-white font-bold text-2xl rounded-full hover:bg-Indigo-Blue"
					// onClick={onReturnStages}
				>
					Return
				</button>
			</div>
		</div>
	)
}
export default Rewards
