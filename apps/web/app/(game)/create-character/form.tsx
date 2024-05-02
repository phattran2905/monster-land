'use client'
import Avatar from '@components/Avatar'
import { avatarImages } from '@components/Avatar/Avatar'
import Loading from '@components/Loading'
import Logo from '@components/Logo'
import { createProfile } from '@utils/actions/profiles'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaExclamationCircle } from 'react-icons/fa'

export interface CreateCharacterFormData {
	avatar: string
	username: string
}

interface CreateCharacterFormProps {
	uid?: string
}

const CreateCharacterForm = ({ uid }: CreateCharacterFormProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const {
		formState: { errors },
		handleSubmit,
		register,
		setError,
	} = useForm<CreateCharacterFormData>({
		defaultValues: {
			avatar: avatarImages[0]?.name,
			username: '',
		},
	})

	const onSubmit: SubmitHandler<CreateCharacterFormData> = async ({
		avatar,
		username,
	}) => {
		setIsLoading(true)

		const { data: newProfile, error: profileError } =
			(await createProfile({
				avatar,
				uid,
				username,
			})) || {}

		if (!newProfile || profileError) {
			setError('root.serverError', {
				message: profileError?.message,
				type: '400',
			})
		}

		setIsLoading(false)
		router.push('/')
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{isLoading ? (
				<Loading type="circle" />
			) : (
				<div className="flex flex-row">
					{/* Avatar */}
					<div className="basis-1/2">
						<Avatar register={register} />
					</div>
					{/* Username */}
					<div className="basis-1/2 py-10 px-4 flex flex-col justify-center items-center">
						<Logo className="!w-1/3 !m-10" />

						<div className="flex flex-col justify-center items-center">
							<div className="flex flex-col justify-center items-center">
								<h2 className="py-2 m text-4xl font-bold text-Midnight-Gray inline-block">
									What's Your Name
								</h2>
								<input
									{...register('username', { required: true })}
									className="py-4 px-8 my-8 border-4 border-Indigo-Blue rounded-lg focus:border-Flamingo-Pink text-center font-bold"
									id="username"
									placeholder="Your Name"
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
						</div>
					</div>
					{/* Create button */}
					<div className="absolute -bottom-10 w-full flex flex-row justify-center items-center">
						<button
							className="bg-Flamingo-Pink px-16 py-4 text-white rounded-full font-bold text-2xl border-4 border-white hover:border-x-Flamingo-Pink hover:bg-Midnight-Gray"
							type="submit"
						>
							Create
						</button>
					</div>
				</div>
			)}
		</form>
	)
}
export default CreateCharacterForm
