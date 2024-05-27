'use client'

import Avatar, { avatarImages, getAvatarName } from '@components/Avatar'
import Loading from '@components/Loading'
import { Button } from '@components/ui/button'
import { Card } from '@components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { Progress } from '@components/ui/progress'
import { useToast } from '@components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { TrainerSchema, TrainerSchemaType } from '@schemas/profile'
import { updateProfile } from '@server/trainer/profile'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineNumber, AiTwotoneMail } from 'react-icons/ai'
import { FaCalendarCheck, FaUserAlt } from 'react-icons/fa'

const TrainerForm = ({
	avatar: _avatar,
	created_at,
	email,
	exp = 0,
	level_up_exp = 0,
	uid,
	username,
}: TrainerSchemaType) => {
	const [isLoading, setIsLoading] = useState(false)
	const form = useForm<TrainerSchemaType>({
		defaultValues: {
			avatar: _avatar || getAvatarName(avatarImages[0]?.name),
			created_at,
			email,
			uid,
			username,
		},
		resolver: zodResolver(TrainerSchema),
	})
	const { control, handleSubmit } = form
	const { toast } = useToast()

	const onSubmit = async (formData: TrainerSchemaType) => {
		setIsLoading(true)

		const { message, status } = await updateProfile(formData)
		if (status === 'error') {
			toast({
				description: message,
				variant: 'destructive',
			})
			setIsLoading(false)
			return undefined
		}

		toast({
			description: message,
			variant: 'success',
		})
		setIsLoading(false)
	}

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Card className="flex flex-row mx-auto">
					{/* Avatar Selection */}
					<div className="flex-[1_1_50%] bg-Indigo-Blue">
						{/* Avatar & EXP */}
						<div className="mx-auto">
							<Avatar avatar={_avatar} />

							{/* EXP */}
							<div className="flex flex-col items-start gap-x-2 mx-10 mb-6">
								<div className="flex flex-row items-center justify-between w-full">
									<span className="text-white underline font-bold text-xl">
										EXP:
									</span>
									<div className="flex flex-row mt-2 items-center">
										<span className="text-Gold-Sand font-bold text-lg inline-block">
											{exp}/
										</span>
										<span className="text-white font-bold text-lg inline-block">
											{level_up_exp}
										</span>
									</div>
								</div>

								<div className="flex flex-col flex-grow w-full">
									<Progress value={Math.floor(exp / level_up_exp)} />
								</div>
							</div>
						</div>
					</div>

					{/* Info */}
					<div className="flex-[1_1_50%] p-6 md:p-10 flex flex-col items-center">
						<div className="w-full flex flex-col my-4 gap-y-4">
							<FormField
								control={control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex flex-row gap-x-2 items-center">
											<FaUserAlt />
											<span className="block">Username</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Username"
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
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex flex-row gap-x-2 items-center">
											<AiTwotoneMail />
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
								name="uid"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex flex-row gap-x-2 items-center">
											<AiOutlineNumber />
											<span className="block">UID</span>
										</FormLabel>
										<FormControl>
											<Input
												disabled
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="created_at"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex flex-row gap-x-2 items-center">
											<FaCalendarCheck />
											<span className="block">Joined since</span>
										</FormLabel>
										<FormControl>
											<Input
												disabled
												placeholder="MM/DD/YYYY"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Button
							className="self-end"
							disabled={isLoading}
							type="submit"
						>
							{isLoading ? (
								<Loading type="circle" />
							) : (
								<span>Save changes</span>
							)}
						</Button>
					</div>
				</Card>
			</form>
		</Form>
	)
}
export default TrainerForm
