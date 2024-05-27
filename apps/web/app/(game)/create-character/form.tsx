'use client'
import Avatar from '@components/Avatar'
import { avatarImages } from '@components/Avatar/Avatar'
import Loading from '@components/Loading'
import Logo from '@components/Logo'
import { Button } from '@components/ui/button'
import { Card } from '@components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { useToast } from '@components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProfile } from '@server/trainer/profile'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

interface CreateCharacterFormProps {
	email?: string
	uid?: string
}

const CreateCharSchema = z.object({
	avatar: z.string(),
	username: z.string(),
})

type CreateCharSchemaType = z.infer<typeof CreateCharSchema>

const CreateCharacterForm = ({ email, uid }: CreateCharacterFormProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const form = useForm<CreateCharSchemaType>({
		defaultValues: {
			avatar: avatarImages[0]?.name,
			username: '',
		},
		resolver: zodResolver(CreateCharSchema),
	})
	const { control, handleSubmit } = form
	const { toast } = useToast()

	const onSubmit: SubmitHandler<CreateCharSchemaType> = async (
		formData: CreateCharSchemaType
	) => {
		setIsLoading(true)

		const { message, status } = await createProfile({
			...formData,
			email: email!!,
			uid,
		})
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
				<Card className="flex flex-row">
					{/* Avatar */}
					<div className="basis-1/2">
						<Avatar />
					</div>
					<div className="basis-1/2 py-10 px-4 flex flex-col justify-center items-center">
						<Logo className="!w-1/3 !m-10" />

						<div className="flex flex-col justify-center items-center">
							<div className="flex flex-col justify-center items-center gap-y-4">
								<h2 className="py-2 text-4xl font-bold text-Midnight-Gray inline-block">
									What's Your Name
								</h2>
								<FormField
									control={control}
									name="username"
									render={({ field }) => (
										<FormItem>
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
							</div>
						</div>
						<Button
							className="mt-8"
							disabled={isLoading}
							size="lg"
							type="submit"
						>
							{isLoading ? <Loading type="circle" /> : <span>Create</span>}
						</Button>
					</div>
				</Card>
			</form>
		</Form>
	)
}
export default CreateCharacterForm
