'use client'

import Loading from '@components/Loading'
import Logo from '@components/Logo'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaExclamationCircle, FaLock, FaUserAlt } from 'react-icons/fa'

interface SignUpFormData {
	confirmPassword: string
	password: string
	username: string
}

const Page = () => {
	const [isLoading, setIsLoading] = useState(false)
	const {
		formState: { errors },
		getValues,
		handleSubmit,
		register,
		watch,
	} = useForm<SignUpFormData>({
		defaultValues: {
			confirmPassword: '',
			password: '',
			username: '',
		},
	})

	const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
		setIsLoading(true)
		console.log(data)
		console.log(errors)
	}

	return (
		<div className="flex flex-col gap-y-10">
			<Logo className="mx-auto" />

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="w-2/3 mx-auto flex flex-col">
					<div className="flex flex-col items-stretch gap-y-4">
						{/* Username */}
						<div>
							<label
								className="flex flex-row justify-between items-center mb-2"
								htmlFor="username"
							>
								<div className="flex flex-row items-center">
									<FaUserAlt className="text-Royal-Blue mr-2 text-xl" />
									<span className="text-lg text-Royal-Blue font-bold ">
										Username
									</span>
								</div>
								{errors?.username?.type === 'required' && (
									<div className="text-Fire-Engine-Red font-bold rounded flex items-center flex-row gap-x-1 px-1">
										<FaExclamationCircle />
										<span className="text-sm">Required</span>
									</div>
								)}
							</label>
							<input
								{...register('username', { required: true })}
								className="border-4 border-Indigo-Blue p-4 w-full rounded-lg focus:border-Flamingo-Pink"
								id="username"
								placeholder="Username"
								type="text"
							/>
						</div>
						{/* Password */}
						<div>
							<label
								className="flex flex-row justify-between items-center mb-2"
								htmlFor="password"
							>
								<div className="flex flex-row items-center">
									<FaLock className="text-Royal-Blue mr-2 text-xl" />
									<span className="text-lg text-Royal-Blue font-bold ">
										Password
									</span>
								</div>
								{errors?.password?.type === 'required' && (
									<div className="text-Fire-Engine-Red font-bold rounded flex items-center flex-row gap-x-1 px-1">
										<FaExclamationCircle />
										<span className="text-sm">Required</span>
									</div>
								)}
							</label>
							<input
								{...register('password', { minLength: 4, required: true })}
								className="border-4 border-Indigo-Blue p-4 w-full rounded-lg focus:border-Flamingo-Pink"
								id="password"
								placeholder="********"
								type="password"
							/>
						</div>
						{/* Confirm Password */}
						<div>
							<label
								className="flex flex-row justify-between items-center mb-2"
								htmlFor="confirm-password"
							>
								<div className="flex flex-row items-center">
									<FaLock className="text-Royal-Blue mr-2 text-xl" />
									<span className="text-lg text-Royal-Blue font-bold">
										Confirm
									</span>
								</div>
								{errors?.confirmPassword?.type === 'required' && (
									<div className="text-Fire-Engine-Red font-bold rounded flex items-center flex-row gap-x-1 px-1">
										<FaExclamationCircle />
										<span className="text-sm">Required</span>
									</div>
								)}
							</label>
							<input
								{...register('confirmPassword', { required: true })}
								className="border-4 border-Indigo-Blue p-4 w-full rounded-lg focus:border-Flamingo-Pink"
								id="confirm-password"
								placeholder="********"
								type="password"
							/>
						</div>
						{/* Error */}
						{/* {(errors?.password?.type ||
							errors?.confirmPassword?.type ||
							errors?.username?.type) && (
							<div className="flex flex-col gap-y-1">
								{errors.username?.type === 'required' && (
									<div className="flex flex-row items-center p-2 bg-Fire-Engine-Red/90 rounded">
										<FaExclamationCircle className="text-white mx-2" />

										<p className="text-white font-bold capitalize">
											Username is required
										</p>
									</div>
								)}
								{errors.password?.type === 'required' && (
									<div className="flex flex-row items-center p-2 bg-Fire-Engine-Red/90 rounded">
										<FaExclamationCircle className="text-white mx-2" />

										<p className="text-white font-bold capitalize">
											Password is required
										</p>
									</div>
								)}
								{errors.confirmPassword?.type === 'required' && (
									<div className="flex flex-row items-center p-2 bg-Fire-Engine-Red/90 rounded">
										<FaExclamationCircle className="text-white mx-2" />

										<p className="text-white font-bold capitalize">
											Confirm Password is required
										</p>
									</div>
								)}
							</div>
						)} */}

						{/* Loading & Submit */}
						{isLoading ? (
							<Loading type="circle" />
						) : (
							<button
								className="py-3 px-16 rounded-full capitalize text-2xl bg-Royal-Blue text-white font-bold hover:bg-Flamingo-Pink duration-300 mt-4"
								type="submit"
							>
								Sign Up
							</button>
						)}

						{/* Link to register */}
						<div className="w-full flex justify-center items-center">
							<p className="p-1">
								Already have an account?
								<Link
									className="mx-2 underline font-bold text-Flamingo-Pink"
									href="/login"
								>
									Login
								</Link>
							</p>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Page
