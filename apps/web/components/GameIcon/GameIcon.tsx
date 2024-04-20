import CrossSwordsIcon from '@assets/img/challenges/cross-swords.png'
import pickaxeIcon from '@assets/img/icon/Pickaxe.png'
import BackpackIcon from '@assets/img/icon/backpack.png'
import coinIcon from '@assets/img/icon/coin_1_.png'
import diamondIcon from '@assets/img/icon/diamond_1_.png'
import DragonIcon from '@assets/img/icon/font-awesome-dragon.png'
import MapIcon from '@assets/img/icon/font-awesome-map.png'
import PowerOffIcon from '@assets/img/icon/font-awesome-power-off.png'
import UserIcon from '@assets/img/icon/font-awesome-user.png'
import HydraIcon from '@assets/img/icon/hydra.png'
import IncubatorIcon from '@assets/img/icon/incubator.png'
import ShieldIcon from '@assets/img/icon/shield.png'
import SwordIcon from '@assets/img/icon/sword.png'
import { ClassValue } from 'clsx'
import Image from 'next/image'

export type IconTypes =
	| 'backpack'
	| 'challenges'
	| 'coin'
	| 'crossSwords'
	| 'diamond'
	| 'incubation'
	| 'monster-collection'
	| 'pickaxe'
	| 'power-off'
	| 'shield'
	| 'sword'
	| 'team'
	| 'user'

interface GameIconProps {
	className?: ClassValue
	fill?: boolean
	height?: number
	type: IconTypes
	width?: number
}

const Icons = {
	backpack: BackpackIcon,
	challenges: MapIcon,
	coin: coinIcon,
	crossSwords: CrossSwordsIcon,
	diamond: diamondIcon,
	incubation: IncubatorIcon,
	'monster-collection': DragonIcon,
	pickaxe: pickaxeIcon,
	'power-off': PowerOffIcon,
	shield: ShieldIcon,
	sword: SwordIcon,
	team: HydraIcon,
	user: UserIcon,
}

const GameIcon = ({ fill, height, type, width }: GameIconProps) => {
	if (!type || !Icons[type]) return null

	return (
		<Image
			alt={`${type} icon`}
			fill={fill}
			height={height}
			src={Icons[type]}
			width={width}
		/>
	)
}
export default GameIcon
