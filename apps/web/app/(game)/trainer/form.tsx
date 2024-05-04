'use client'

import Avatar, { avatarImages, getAvatarName } from '@components/Avatar'
import Loading from '@components/Loading'
import ProgressBar from '@components/ProgressBar'
import { updateProfile } from '@utils/actions/profiles'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineNumber, AiTwotoneMail } from 'react-icons/ai'
import { FaCalendarCheck, FaExclamationCircle, FaUserTag } from 'react-icons/fa'

interface TrainerFormProps {
	avatar?: string
	createdAt?: string
	email?: string
	exp?: number
	levelUpExp?: number
	onSubmit?: any
	uid?: string
	username?: string
}

type TrainerFormData = Pick<TrainerFormProps, 'avatar' | 'email' | 'username'>

const TrainerForm = ({
	avatar: _avatar,
	createdAt,
	email,
	exp = 0,
	levelUpExp = 0,
	uid,
	username,
}: TrainerFormProps) => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const {
		formState: { errors },
		handleSubmit,
		register,
		setError,
		setValue,
	} = useForm<TrainerFormData>({
		defaultValues: {
			avatar: _avatar || getAvatarName(avatarImages[0]?.name),
			email: email || '',
			username: username || '',
		},
	})

	const onSubmit: SubmitHandler<TrainerFormData> = async ({
		avatar,
		email,
		username,
	}) => {
		setIsLoading(true)

		if (!avatar && !email && !username) {
			setIsLoading(false)
			return null
		}

		const { data: updatedProfile, error } =
			(await updateProfile(
				{
					avatar,
					email,
					username,
				},
				uid
			)) || {}

		if (!updatedProfile || error) {
			setError('root.serverError', {
				message: error?.message,
				type: '400',
			})
		}

		setIsLoading(false)
		router.refresh()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{isLoading ? (
				<Loading type="circle" />
			) : (
				<div className="flex flex-col gap-y-8 justify-center items-center m-8 p-12">
					<div className="w-full flex sm:flex-row flex-col justify-start items-start border-2 border-Indigo-Blue rounded-md relative">
						{/* Avatar Selection */}
						<div className="w-full sm:w-1/2 h-full bg-Indigo-Blue flex flex-col items-center">
							{/* Avatar & EXP */}
							<div className="w-full">
								<Avatar
									avatar={_avatar}
									register={register}
									setValue={setValue}
								/>

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
											percentage={Math.floor(exp / levelUpExp)}
										/>

										<div className="flex flex-row mt-2 justify-between items-center">
											<span className="text-Gold-Sand font-bold text-lg inline-block">
												{exp}
											</span>
											<span className="text-white font-bold text-lg inline-block">
												{levelUpExp}
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
										htmlFor="username"
									>
										<FaUserTag className="text-2xl mr-1" />
										Username
									</label>
									<input
										{...register('username')}
										className="border-4 border-Indigo-Blue px-8 py-4 rounded-full focus:border-Flamingo-Pink"
										id="name"
										placeholder="Your Username"
										type="text"
									/>
									{errors?.username?.type && (
										<div className="text-Fire-Engine-Red font-bold rounded flex items-center flex-row gap-x-1 px-1">
											<FaExclamationCircle />
											<span className="text-sm">
												{errors.username.type === 'required'
													? 'Required'
													: errors.username?.message}
											</span>
										</div>
									)}
								</div>
								<div className="flex flex-col gap-y-1">
									<span className="text-Indigo-Blue font-bold flex flex-row text-xl">
										<AiTwotoneMail className="text-2xl mr-1" />
										Email
									</span>
									<span className="border-4 border-Indigo-Blue px-8 py-4 rounded-full bg-Midnight-Gray text-white">
										{email}
									</span>
								</div>
								<div className="flex flex-col gap-y-1">
									<span className="text-Indigo-Blue font-bold flex flex-row text-xl">
										<AiOutlineNumber className="text-2xl mr-1" />
										UID
									</span>

									<span className="border-4 border-Indigo-Blue px-8 py-4 rounded-full bg-Midnight-Gray text-white">
										{uid}
									</span>
								</div>
								<div className="flex flex-col gap-y-1">
									<span className="text-Indigo-Blue font-bold flex flex-row text-xl">
										<FaCalendarCheck className="text-2xl mr-1" />
										Joined since
									</span>
									<span className="border-4 border-Indigo-Blue px-8 py-4 rounded-full bg-Midnight-Gray text-white">
										{createdAt}
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* Save Button */}
					<div className="w-full flex flex-row justify-center items-center">
						<button
							className="bg-Flamingo-Pink px-16 py-4 text-white rounded-full font-bold text-2xl border-4 border-white hover:border-Flamingo-Pink hover:bg-white hover:text-Flamingo-Pink"
							type="submit"
						>
							Save changes
						</button>
					</div>
				</div>
			)}
		</form>
	)
}
export default TrainerForm
