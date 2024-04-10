'use client'

import body1 from '@assets/img/avatars/body-1.png'
import body2 from '@assets/img/avatars/body-2.png'
import body3 from '@assets/img/avatars/body-3.png'
import body4 from '@assets/img/avatars/body-4.png'
import ProgressBar from '@components/ProgressBar'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AiFillTag, AiOutlineNumber, AiTwotoneMail } from 'react-icons/ai'
import {
	FaAngleLeft,
	FaAngleRight,
	FaCalendarCheck,
	FaExclamationCircle,
	FaUserTag,
} from 'react-icons/fa'

interface TrainerProfile {
	email?: string
	name?: string
}

interface Trainer {
	avatar: string
	createdAt: string
	email: string
	exp: number
	joined: string
	levelUpExp: number
	name: string
	uid: string
	username: string
}

interface PageProps {
	trainer: Trainer
}

const avatarImages = [body1, body2, body3, body4]

const Page = ({
	trainer = {
		avatar: '',
		createdAt: '',
		email: '',
		exp: 0,
		joined: '11/11/1111',
		levelUpExp: 0,
		name: '',
		uid: '1234567890',
		username: 'conchuot',
	},
}: PageProps) => {
	const totalAvatarImages = 4
	const [avatarIndex, setAvatarIndex] = useState(1)
	const { handleSubmit, register } = useForm<TrainerProfile>({
		defaultValues: {
			email: trainer.email || '',
			name: trainer.name || '',
		},
	})

	const selectAvatarImage = (actionType: string) => {
		if (actionType === 'prev') {
			const index = avatarIndex - 1
			if (index < 1) {
				setAvatarIndex(1)
			} else {
				setAvatarIndex(index)
			}
		} else {
			const index = avatarIndex + 1
			if (index > totalAvatarImages) {
				setAvatarIndex(totalAvatarImages)
			} else {
				setAvatarIndex(index)
			}
		}
	}

	const onSubmit: SubmitHandler<TrainerProfile> = (data: any) => {
		console.log(data)
	}

	return (
		<div className="flex flex-col ">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col justify-center items-center gap-y-8">
					<div className="w-full md:w-10/12 flex sm:flex-row flex-col justify-start items-start border-2 border-Indigo-Blue rounded-md relative">
						{/* Avatar Selection */}
						<div className="w-full sm:w-1/2 h-full p-2 md:p-6 bg-Indigo-Blue flex flex-col items-center">
							{/* Title */}
							<h2 className="py-2 text-4xl font-bold text-Gold-Sand border-b-4 border-Gold-Sand inline-block">
								Avatar
							</h2>

							{/* Avatar & EXP */}
							<div className="w-full">
								<div className="flex flex-row justify-center items-center">
									<button onClick={() => selectAvatarImage('prev')}>
										<FaAngleLeft
											className={`text-4xl text-white ${
												avatarIndex <= 1
													? 'opacity-40 hover:cursor-not-allowed'
													: 'hover:text-Flamingo-Pink'
											}`}
										/>
									</button>
									<div className="bg-white md:w-80 w-60 py-10 rounded-3xl mt-10 m-4">
										<div className="relative w-44 md:h-96 h-80 mx-auto ">
											<Image
												alt={trainer?.avatar}
												className="object-scale-down"
												fill
												src={avatarImages[avatarIndex - 1] as StaticImport}
											/>
										</div>
									</div>
									<button onClick={() => selectAvatarImage('next')}>
										<FaAngleRight
											className={`text-4xl text-white ${
												avatarIndex === totalAvatarImages
													? 'opacity-40 hover:cursor-not-allowed'
													: 'hover:text-Flamingo-Pink'
											}`}
										/>
									</button>
								</div>

								{/* EXP */}
								<div className="flex flex-col justify-center p-4 md:py-4 md:px-8">
									<p className="my-3 text-white underline font-bold text-xl">
										EXP:
									</p>

									<div>
										<ProgressBar
											classNames={{
												background: 'bg-white',
												current: 'bg-Gold-Sand',
											}}
											percentage={Math.floor(
												trainer?.exp / trainer?.levelUpExp
											)}
										/>

										<div className="flex flex-row mt-2 justify-between items-center">
											<span className="text-Gold-Sand font-bold text-lg inline-block">
												{trainer?.exp}
											</span>
											<span className="text-white font-bold text-lg inline-block">
												{trainer?.levelUpExp}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Info */}
						<div className="w-full sm:w-1/2 h-full p-6 md:p-16 flex flex-col items-center">
							<div className="w-full flex flex-col items-stretch my-4 gap-y-4">
								<div className="flex flex-col gap-y-1">
									<label
										className="text-Indigo-Blue font-bold flex flex-row text-xl"
										htmlFor="name"
									>
										<FaUserTag className="text-2xl mr-1" />
										Name
									</label>
									<input
										{...register('name')}
										className="border-4 border-Indigo-Blue px-8 py-4 rounded-full focus:border-Flamingo-Pink"
										id="name"
										placeholder="Your Name"
										type="text"
									/>
								</div>
								<div className="flex flex-col gap-y-1">
									<label
										className="text-Indigo-Blue font-bold flex flex-row text-xl"
										htmlFor="email"
									>
										<AiTwotoneMail className="text-2xl mr-1" />
										Email
									</label>
									<input
										{...register('email')}
										className="border-4 border-Indigo-Blue px-8 py-4 rounded-full focus:border-Flamingo-Pink"
										id="email"
										placeholder="youremail@email.com"
										type="email"
									/>
								</div>
								<div className="flex flex-col gap-y-1">
									<span className="text-Indigo-Blue font-bold flex flex-row text-xl">
										<AiFillTag className="text-2xl mr-1" />
										Username
									</span>

									<span className="border-4 border-Indigo-Blue px-8 py-4 rounded-full bg-Midnight-Gray text-white">
										{trainer?.username}
									</span>
								</div>
								<div className="flex flex-col gap-y-1">
									<span className="text-Indigo-Blue font-bold flex flex-row text-xl">
										<AiOutlineNumber className="text-2xl mr-1" />
										ID
									</span>

									<span className="border-4 border-Indigo-Blue px-8 py-4 rounded-full bg-Midnight-Gray text-white">
										{trainer?.uid}
									</span>
								</div>
								<div className="flex flex-col gap-y-1">
									<span className="text-Indigo-Blue font-bold flex flex-row text-xl">
										<FaCalendarCheck className="text-2xl mr-1" />
										Joined
									</span>
									<span className="border-4 border-Indigo-Blue px-8 py-4 rounded-full bg-Midnight-Gray text-white">
										{trainer?.joined}
									</span>
								</div>
							</div>

							{/* {error && (
							<div className="bg-Fire-Engine-Red flex flex-row justify-start items-center p-4 self-stretch">
								<FaExclamationCircle className="mx-2 text-xl text-white" />
								<p className="text-white p-1">{error}</p>
							</div>
						)}
						{successMsg && (
							<div className="bg-Forest-Green flex flex-row justify-start items-center p-4 self-stretch">
								<FaExclamationCircle className="mx-2 text-xl text-white" />
								<p className="text-white p-1">{successMsg}</p>
							</div>
						)} */}
						</div>
					</div>
					{/* Save Button */}
					<div className="w-full flex flex-row justify-center items-center">
						<button className="bg-Flamingo-Pink px-16 py-4 text-white rounded-full font-bold text-2xl border-4 border-white hover:border-Flamingo-Pink hover:bg-white hover:text-Flamingo-Pink">
							Save changes
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
export default Page
