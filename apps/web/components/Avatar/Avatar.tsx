import body1 from '@assets/img/avatars/body-1.png'
import body2 from '@assets/img/avatars/body-2.png'
import body3 from '@assets/img/avatars/body-3.png'
import body4 from '@assets/img/avatars/body-4.png'
import Loading from '@components/Loading'
import { capitalize } from '@utils/capitalize'
import clsx from 'clsx'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

interface AvatarProps {
	avatar?: string
	register: any
	setValue: any
}

export const getAvatarName = (name?: string) => {
	if (!name) return ''

	return name.split('-').map(capitalize).join(' ')
}

export const avatarImages = [
	{
		asset: body1,
		name: 'avatar-1',
	},
	{
		asset: body2,
		name: 'avatar-2',
	},
	{
		asset: body3,
		name: 'avatar-3',
	},
	{
		asset: body4,
		name: 'avatar-4',
	},
]

const findAvatarIndex = (avatar: string) => {
	return avatarImages.findIndex(({ name }) => name === avatar.toLowerCase())
}

const Avatar = ({ avatar, register, setValue }: AvatarProps) => {
	const totalAvatarImages = avatarImages.length
	const [avatarIndex, setAvatarIndex] = useState(() => {
		if (avatar) {
			return findAvatarIndex(avatar)
		}

		return 0
	})

	const selectAvatarImage = (actionType: string) => {
		let index = 0
		if (actionType === 'prev') {
			const prevIndex = avatarIndex - 1
			index = prevIndex <= 0 ? 0 : prevIndex
		} else if (actionType === 'next') {
			const nextIndex = avatarIndex + 1
			index =
				nextIndex >= totalAvatarImages - 1 ? totalAvatarImages - 1 : nextIndex
		}

		setValue('avatar', avatarImages[index]?.name)
		setAvatarIndex(index)

		return index
	}

	useEffect(() => {
		if (avatar) {
			setAvatarIndex(findAvatarIndex(avatar))
		}
	}, [avatar])

	return (
		<div className="w-full h-full px-10 py-6 bg-Indigo-Blue flex flex-col items-center gap-y-4">
			<h2 className="py-2 text-4xl font-bold text-Gold-Sand border-b-4 border-Gold-Sand inline-block">
				Choose Your Avatar
			</h2>

			<div className="w-full h-full flex flex-row justify-between items-center">
				<button
					onClick={() => selectAvatarImage('prev')}
					type="button"
				>
					<FaAngleLeft
						className={`text-4xl text-white ${
							avatarIndex <= 0
								? 'opacity-40 hover:cursor-not-allowed'
								: 'hover:text-Flamingo-Pink'
						}`}
					/>
				</button>
				<div className="h-full w-full mx-6 flex flex-col items-center justify-center">
					<div className="bg-white rounded-t-3xl w-full h-full flex flex-col items-center justify-center p-6">
						<div className="relative h-80 w-44">
							{avatarIndex === undefined ? (
								<Loading type="circle" />
							) : (
								<Image
									alt={`Avatar ${avatarIndex} image`}
									className="object-scale-down"
									fill
									src={avatarImages[avatarIndex]?.asset as StaticImport}
								/>
							)}
						</div>
					</div>
					<div className="h-14 w-full bg-Gold-Sand flex flex-row justify-center items-center rounded-br-3xl rounded-bl-3xl">
						<span className="text-black font-bold text-lg">
							{getAvatarName(avatarImages[avatarIndex]?.name)}
						</span>
						<input
							{...register('avatar', { required: true })}
							hidden
							value={avatarImages[avatarIndex]?.name}
						/>
					</div>
					<div className="flex flex-row w-full justify-center items-center gap-2 mt-4">
						{avatarImages.map(({ name }, index) => (
							<div
								className={clsx(
									'w-4 h-4 rounded-full ',
									avatarIndex === index ? 'bg-Gold-Sand' : 'bg-white/50'
								)}
								key={name}
							/>
						))}
						<div />
					</div>
				</div>
				<button
					onClick={() => selectAvatarImage('next')}
					type="button"
				>
					<FaAngleRight
						className={`text-4xl text-white ${
							avatarIndex === totalAvatarImages - 1
								? 'opacity-40 hover:cursor-not-allowed'
								: 'hover:text-Flamingo-Pink'
						}`}
					/>
				</button>
			</div>
		</div>
	)
}
export default Avatar
