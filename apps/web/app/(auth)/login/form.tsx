'use client'

import Loading from '@components/Loading'
import { createClient } from '@utils/supabase/client'
import clsx from 'clsx'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
	FaCheckCircle,
	FaExclamationCircle,
	FaLock,
	FaUserAlt,
} from 'react-icons/fa'

interface LoginFormData {
	email: string
	password: string
	remember: boolean
}

interface LoginFormProps {}
const LoginForm = ({}: LoginFormProps) => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [successMsg, setSuccessMsg] = useState<string | undefined>()
	const {
		formState: { errors },
		getValues,
		handleSubmit,
		register,
		setError,
		watch,
	} = useForm<LoginFormData>({
		defaultValues: {
			email: '',
			password: '',
			remember: false,
		},
	})
	watch('remember')

	const onSubmit: SubmitHandler<LoginFormData> = async ({
		email,
		password,
	}) => {
		setIsLoading(true)
		setSuccessMsg('')

		if (!email || !password) {
			setIsLoading(false)
			return undefined
		}

		const supabase = createClient()
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error) {
			setError('root.serverError', { message: error.message, type: '400' })
			setIsLoading(false)
			return undefined
		}

		setIsLoading(false)
		setSuccessMsg('Successfully. Redirecting to your dashboard...')
		router.push('/dashboard')
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="w-2/3 mx-auto flex flex-col">
				<div className="flex flex-col items-stretch gap-y-4">
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
							{errors?.email?.type && (
								<div className="text-Fire-Engine-Red font-bold rounded flex items-center flex-row gap-x-1 px-1">
									<FaExclamationCircle />
									<span className="text-sm">
										{errors.email.type === 'required'
											? 'Required'
											: errors.email?.message}
									</span>
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
					{/* Stay Logged In */}
					<div className="flex flex-row items-center">
						<label
							className="text-xl text-Royal-Blue font-bold pl-10 py-2 relative flex flex-row justify-center items-center align-middle group"
							htmlFor="remember"
						>
							<span
								className={clsx(
									'size-6 left-0 bg-white border-4 border-Royal-Blue absolute rounded block group-hover:border-4 group-hover:border-Flamingo-Pink after:content-[""] after:absolute after:w-4 after:h-8 after:border-r-4 after:border-b-4 after:border-Flamingo-Pink after:rotate-45 after:left-1 after:-top-4',
									getValues('remember') ? 'after:block' : 'after:hidden'
								)}
							/>
							<input
								{...register('remember')}
								checked={getValues('remember')}
								className="w-0 h-0 opacity-0 cursor-pointer"
								id="remember"
								type="checkbox"
							/>
							<span className="block">Stay logged in</span>
						</label>
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

					{/* Loading & Submit  */}
					{isLoading ? (
						<Loading type="circle" />
					) : (
						<button
							className="py-3 px-16 rounded-full capitalize text-2xl bg-Royal-Blue text-white font-bold hover:bg-Flamingo-Pink duration-300 mt-4"
							type="submit"
						>
							Log in
						</button>
					)}

					{/* Link to register */}
					<div className="w-full flex justify-center items-center">
						<p className="p-1">
							Don't have an account?
							<Link
								className="mx-2 underline font-bold text-Flamingo-Pink"
								href="/sign-up"
							>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</form>
	)
}
export default LoginForm
