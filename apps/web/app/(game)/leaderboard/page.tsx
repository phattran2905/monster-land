import bouldersmash from '@assets/img/monsters/bouldersmash.png'
import Loading from '@components/Loading'
import { createClient } from '@utils/supabase/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
// import { useState } from 'react'
import { AiOutlineNumber } from 'react-icons/ai'
import { FaChessRook } from 'react-icons/fa'
import { GiBroadsword, GiLightningShield } from 'react-icons/gi'
import { TbAwardFilled } from 'react-icons/tb'

interface Monster {
	attack?: number
	defense?: number
	img_name?: string
	level?: number
	name?: string
	uid?: number
}

interface PageProps {
	params: {
		slug: string
	}
	topAttack?: Monster
	topDefense?: Monster
	topLevel?: Monster
}

const Page = async ({
	topAttack = {
		attack: 0,
		defense: 0,
		img_name: '',
		level: 0,
		name: 'Monster',
		uid: 0,
	},
	topDefense = {
		attack: 0,
		defense: 0,
		img_name: '',
		level: 0,
		name: 'Monster',
		uid: 0,
	},
	topLevel = {
		attack: 0,
		defense: 0,
		img_name: '',
		level: 0,
		name: 'Monster',
		uid: 0,
	},
}: PageProps) => {
	// const [isLoading, setIsLoading] = useState(false)
	const supabase = createClient()

	const { data, error } = await supabase.auth.getUser()
	if (error || !data?.user) {
		redirect('/login')
	}
	return (
		<section className="px-12 py-5 flex flex-col items-center gap-y-14">
			{/* H1 */}
			<div className="w-[28rem] p-4 rounded-full shadow-md bg-[#FFFD82]">
				<div className="flex flex-row justify-around items-center relative">
					<h1 className="font-heading font-bold text-3xl text-center uppercase text-Midnight-Gray">
						Golden Board
					</h1>
					<div className="absolute left-0 top-8 rotate-[30deg]">
						<TbAwardFilled
							className="text-Midnight-Gray"
							size={40}
						/>
					</div>
					<div className="absolute right-0 top-8 -rotate-[30deg]">
						<TbAwardFilled
							className="text-Midnight-Gray"
							size={40}
						/>
					</div>
				</div>
			</div>
			{/* Monsters */}
			<div className="w-full flex flex-row justify-around items-center flex-wrap">
				{/* {isLoading ? (
					<Loading type="circle" />
				) : ( */}
				<>
					{/* Top Level */}
					<div className="flex flex-col w-80 justify-between gap-y-4 bg-white">
						{/* Title */}
						<div className="bg-Flamingo-Pink shadow-md shadow-Amethyst-Purple rounded-lg p-4 flex flex-row justify-center items-center">
							<FaChessRook
								className="text-Gold-Sand"
								size={24}
							/>
							<h2 className="text-2xl font-bold text-white mx-2">No.1 Level</h2>
						</div>
						{/* Image */}
						<div className="w-full h-96 rounded-lg shadow-lg shadow-Gold-Sand border-2 border-light-white">
							<Image
								alt={topLevel?.name || 'Monster'}
								className="w-full h-full object-scale-down"
								src={bouldersmash}
							/>
						</div>
						{/* Details */}
						<div className="w-full rounded-lg shadow-md border border-light-white">
							{/* Name */}
							<div className="p-4 bg-Indigo-Blue w-full rounded-t-lg">
								<p className="font-bold text-white text-center text-xl">
									{topLevel?.name}
								</p>
							</div>
							{/* Attribute */}
							<div className="py-4 px-8 flex flex-col gap-y-3">
								{/* UID */}
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-row items-center">
										<AiOutlineNumber
											className="text-Flamingo-Pink"
											size={22}
										/>
										<span className="text-Indigo-Blue font-bold mx-2 text-lg">
											UID
										</span>
									</div>
									<div className="bg-Flamingo-Pink rounded-lg py-2 px-4">
										<span className="font-bold text-white">
											{topLevel?.uid}
										</span>
									</div>
								</div>
								{/* Level */}
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-row items-center">
										<FaChessRook
											className="text-Flamingo-Pink"
											size={22}
										/>
										<span className="text-Indigo-Blue font-bold mx-2 text-lg">
											Level
										</span>
									</div>
									<div className="bg-Flamingo-Pink rounded-lg py-2 px-4">
										<span className="font-bold text-white">
											{topLevel?.level}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Top Attack */}
					<div className="flex flex-col w-80 justify-between gap-y-4 bg-white">
						{/* Title */}
						<div className="bg-Flamingo-Pink shadow-md shadow-Amethyst-Purple rounded-lg p-4 flex flex-row justify-center items-center">
							<GiBroadsword
								className="text-Gold-Sand"
								size={24}
							/>
							<h2 className="text-2xl font-bold text-white mx-2">
								No.1 Attack
							</h2>
						</div>
						{/* Image */}
						<div className="w-full h-96 rounded-lg shadow-lg shadow-Gold-Sand border-2 border-light-white">
							<Image
								alt={topLevel?.name || 'Monster'}
								className="w-full h-full object-scale-down"
								src={bouldersmash}
							/>
						</div>
						{/* Details */}
						<div className="w-full rounded-lg shadow-md border border-light-white">
							{/* Name */}
							<div className="p-4 bg-Indigo-Blue w-full rounded-t-lg">
								<p className="font-bold text-white text-center text-xl">
									{topAttack?.name}
								</p>
							</div>
							{/* Attribute */}
							<div className="py-4 px-8 flex flex-col gap-y-3">
								{/* UID */}
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-row items-center">
										<AiOutlineNumber
											className="text-Flamingo-Pink"
											size={22}
										/>
										<span className="text-Indigo-Blue font-bold mx-2 text-lg">
											UID
										</span>
									</div>
									<div className="bg-Flamingo-Pink rounded-lg py-2 px-4">
										<span className="font-bold text-white">
											{topLevel?.uid}
										</span>
									</div>
								</div>
								{/* Level */}
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-row items-center">
										<GiBroadsword
											className="text-Flamingo-Pink"
											size={22}
										/>
										<span className="text-Indigo-Blue font-bold mx-2 text-lg">
											Attack
										</span>
									</div>
									<div className="bg-Flamingo-Pink rounded-lg py-2 px-4">
										<span className="font-bold text-white">
											{topAttack?.attack}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Top Defense */}
					<div className="flex flex-col w-80 justify-between gap-y-4 bg-white">
						{/* Title */}
						<div className="bg-Flamingo-Pink shadow-md shadow-Amethyst-Purple rounded-lg p-4 flex flex-row justify-center items-center">
							<GiLightningShield
								className="text-Gold-Sand"
								size={24}
							/>
							<h2 className="text-2xl font-bold text-white mx-2">No.1 Level</h2>
						</div>
						{/* Image */}
						<div className="w-full h-96 rounded-lg shadow-lg shadow-Gold-Sand border-2 border-light-white">
							<Image
								alt={topLevel?.name || 'Monster'}
								className="w-full h-full object-scale-down"
								src={bouldersmash}
							/>
						</div>
						{/* Details */}
						<div className="w-full rounded-lg shadow-md border border-light-white">
							{/* Name */}
							<div className="p-4 bg-Indigo-Blue w-full rounded-t-lg">
								<p className="font-bold text-white text-center text-xl">
									{topDefense?.name}
								</p>
							</div>
							{/* Attribute */}
							<div className="py-4 px-8 flex flex-col gap-y-3">
								{/* UID */}
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-row items-center">
										<AiOutlineNumber
											className="text-Flamingo-Pink"
											size={22}
										/>
										<span className="text-Indigo-Blue font-bold mx-2 text-lg">
											UID
										</span>
									</div>
									<div className="bg-Flamingo-Pink rounded-lg py-2 px-4">
										<span className="font-bold text-white">
											{topLevel?.uid}
										</span>
									</div>
								</div>
								{/* Level */}
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-row items-center">
										<GiLightningShield
											className="text-Flamingo-Pink"
											size={22}
										/>
										<span className="text-Indigo-Blue font-bold mx-2 text-lg">
											Defense
										</span>
									</div>
									<div className="bg-Flamingo-Pink rounded-lg py-2 px-4">
										<span className="font-bold text-white">
											{topDefense?.defense}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
				{/* )} */}
			</div>
		</section>
	)
}

export default Page
