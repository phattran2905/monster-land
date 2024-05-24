'use client'

import Loading from '@components/Loading'
import { Button } from '@components/ui/button'
import { Checkbox } from '@components/ui/checkbox'
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
import LoginFormSchema, { LoginFormSchemaType } from '@schemas/login'
import { onLogin } from '@server/auth/login'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaLock, FaUserAlt } from 'react-icons/fa'

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const form = useForm<LoginFormSchemaType>({
		defaultValues: {
			email: '',
			password: '',
			remember: false,
		},
		resolver: zodResolver(LoginFormSchema),
	})
	const { control, handleSubmit, reset } = form
	const { toast } = useToast()

	const onSubmit = async ({
		email,
		password,
		remember,
	}: LoginFormSchemaType) => {
		setIsLoading(true)

		const { message, status } = await onLogin({ email, password, remember })
		if (status === 'error') {
			toast({
				description: message,
				variant: 'destructive',
			})
			setIsLoading(false)
			return undefined
		}

		setIsLoading(false)
		reset()
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
							name="remember"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center space-x-2 space-y-0">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormLabel className="mt-0">
										<span className="block">Stay logged in</span>
									</FormLabel>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							disabled={isLoading}
							type="submit"
						>
							{isLoading ? <Loading type="circle" /> : <span>Log in</span>}
						</Button>

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
		</Form>
	)
}
export default LoginForm
