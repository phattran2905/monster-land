import clsx, { ClassValue } from 'clsx'
import { GiFire, GiPowerLightning, GiRock, GiWaterSplash } from 'react-icons/gi'

interface MonsterTypeProps {
	name?: string
	uid?: string
}

const MonsterType = ({ name }: MonsterTypeProps) => {
	if (!name) return null

	const classNames: Record<string, { bg: ClassValue; text: ClassValue }> = {
		default: { bg: 'bg-Midnight-Gray', text: 'text-white' },
		electric: { bg: 'bg-Electric', text: 'text-black' },
		fire: { bg: 'bg-Fire', text: 'text-white' },
		rock: { bg: 'bg-Normal', text: 'text-white' },
		water: { bg: 'bg-Water', text: 'text-white' },
	}
	const monsterTypeIcons = {
		electric: GiPowerLightning,
		fire: GiFire,
		rock: GiRock,
		water: GiWaterSplash,
	}
	const MonsterTypeIcon =
		monsterTypeIcons[name.toLowerCase() as keyof typeof monsterTypeIcons] ||
		null

	return (
		<div
			className={clsx(
				`flex flex-row justify-center items-center w-20 h-full p-2 rounded-full`,
				classNames[name.toLowerCase()]?.bg
			)}
		>
			<MonsterTypeIcon
				className={clsx(classNames[name.toLowerCase()]?.text)}
				size={14}
			/>
			<span
				className={clsx(
					`block ml-1 capitalize font-bold text-xs`,
					classNames[name.toLowerCase()]?.text
				)}
			>
				{name}
			</span>
		</div>
	)
}
export default MonsterType
