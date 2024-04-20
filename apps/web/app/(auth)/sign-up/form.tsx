'use client'

import Loading from '@components/Loading'
import { createClient } from '@utils/supabase/client'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
	FaCheckCircle,
	FaExclamationCircle,
	FaLock,
	FaUserAlt,
} from 'react-icons/fa'

interface SignUpFormData {
	confirmPassword?: string
	email: string
	password: string
}

interface SignUpFormProps {}
const SignUpForm = ({}: SignUpFormProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const [successMsg, setSuccessMsg] = useState<string | undefined>()
	const {
		formState: { errors },
		getValues,
		handleSubmit,
		register,
		setError,
		watch,
	} = useForm<SignUpFormData>({
		defaultValues: {
			confirmPassword: '',
			email: '',
			password: '',
		},
	})

	const onSubmit: SubmitHandler<SignUpFormData> = async ({
		confirmPassword,
		email,
		password,
	}) => {
		setIsLoading(true)
		setSuccessMsg('')

		if (!email || !password || !confirmPassword) {
			setIsLoading(false)
			return undefined
		}

		if (password !== confirmPassword) {
			setError('password', {
				message: 'Passwords do not match',
				type: 'manual',
			})
			setError('confirmPassword', {
				message: 'Passwords do not match',
				type: 'manual',
			})
			setIsLoading(false)
			return undefined
		}

		const supabase = createClient()
		const { data, error } = await supabase.auth.signUp({ email, password })

		if (error) {
			setError('root.serverError', { message: error.message, type: '400' })
			setIsLoading(false)
			return undefined
		}

		if (data?.user) {
			setSuccessMsg(
				'Successfully. Please check your email to verify your account.'
			)
			setIsLoading(false)
			return undefined
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="w-2/3 mx-auto flex flex-col">
				<div className="flex flex-col items-stretch gap-y-4">
					{/* email */}
					<div>
						<label
							className="flex flex-row justify-between items-center mb-2"
							htmlFor="email"
						>
							<div className="flex flex-row items-center">
								<FaUserAlt className="text-Royal-Blue mr-2 text-xl" />
								<span className="text-lg text-Royal-Blue font-bold ">
									Email
								</span>
							</div>
							{errors?.email?.type === 'required' && (
								<div className="text-Fire-Engine-Red font-bold rounded flex items-center flex-row gap-x-1 px-1">
									<FaExclamationCircle />
									<span className="text-sm">Required</span>
								</div>
							)}
						</label>
						<input
							{...register('email', { required: true })}
							className="border-4 border-Indigo-Blue p-4 w-full rounded-lg focus:border-Flamingo-Pink"
							id="email"
							placeholder="Email"
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
							{errors?.password?.type && (
								<div className="text-Fire-Engine-Red font-bold rounded flex items-center flex-row gap-x-1 px-1">
									<FaExclamationCircle />
									<span className="text-sm">
										{errors.password.type === 'required'
											? 'Required'
											: errors.password?.message}
									</span>
								</div>
							)}
						</label>
						<input
							{...register('password', { required: true })}
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
							{errors?.confirmPassword?.type && (
								<div className="text-Fire-Engine-Red font-bold rounded flex items-center flex-row gap-x-1 px-1">
									<FaExclamationCircle />
									<span className="text-sm">
										{errors.confirmPassword.type === 'required'
											? 'Required'
											: errors.confirmPassword?.message}
									</span>
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
					{errors?.root?.serverError?.type === '400' && (
						<div className="flex flex-row items-center p-2 bg-Fire-Engine-Red/90 rounded gap-x-2">
							<FaExclamationCircle
								className="text-white"
								size={18}
							/>

							<p className="text-white font-bold capitalize text-sm">
								{errors.root.serverError.message}
							</p>
						</div>
					)}

					{successMsg && (
						<div className="flex flex-row items-center p-2 bg-Forest-Green/90 rounded gap-x-2 text-sm">
							<FaCheckCircle
								className="text-white"
								size={18}
							/>

							<p className="text-white font-bold capitalize">{successMsg}</p>
						</div>
					)}

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
	)
}
export default SignUpForm
