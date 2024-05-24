'use client'

import Loading from '@components/Loading'
import { Button } from '@components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { useToast } from '@components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import SignUpFormSchema, { SignUpFormSchemaType } from '@schemas/signUp'
import { onSignUp } from '@server/auth/signUp'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaLock, FaUserAlt } from 'react-icons/fa'

const SignUpForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const form = useForm<SignUpFormSchemaType>({
		defaultValues: {
			confirmPassword: '',
			email: '',
			password: '',
		},
		resolver: zodResolver(SignUpFormSchema),
	})
	const { control, handleSubmit, reset } = form
	const { toast } = useToast()

	const onSubmit: SubmitHandler<SignUpFormSchemaType> = async ({
		confirmPassword,
		email,
		password,
	}) => {
		setIsLoading(true)

		const { message, status } = await onSignUp({
			confirmPassword,
			email,
			password,
		})
		toast({
			description: message,
			variant: status === 'error' ? 'destructive' : 'success',
		})
		setIsLoading(false)

		if (status === 'success') {
			reset()
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="w-2/3 mx-auto flex flex-col">
					<div className="flex flex-col items-stretch gap-y-6">
						<FormField
							control={control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex flex-row gap-x-2 items-center">
										<FaUserAlt />
										<span className="block">Email</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="name@email.com"
											required
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex flex-row gap-x-2 items-center">
										<FaLock />
										<span className="block">Password</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="******"
											required
											type="password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex flex-row gap-x-2 items-center">
										<FaLock />
										<span className="block">Confirm Password</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="******"
											required
											type="password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							disabled={isLoading}
							type="submit"
						>
							{isLoading ? <Loading type="circle" /> : <span>Sign Up</span>}
						</Button>

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
		</Form>
	)
}
export default SignUpForm
