import { useState } from 'react'
import BackpackIcon from '@assets/img/icon/backpack.png'
import DragonIcon from '@assets/img/icon/font-awesome-dragon.png'
import HydraIcon from '@assets/img/icon/hydra.png'
import MapIcon from '@assets/img/icon/font-awesome-map.png'
import PowerOffIcon from '@assets/img/icon/font-awesome-power-off.png'
import UserIcon from '@assets/img/icon/font-awesome-user.png'
import IncubatorIcon from '@assets/img/icon/incubator.png'

export type IconTypes =
	| 'backpack'
	| 'user'
	| 'challenges'
	| 'monster-collection'
	| 'team'
	| 'incubation'
	| 'power-off'

interface Props {
	type: IconTypes
}

const Icons = {
	backpack: BackpackIcon,
	user: UserIcon,
	challenges: MapIcon,
	'monster-collection': DragonIcon,
	team: HydraIcon,
	incubation: IncubatorIcon,
	'power-off': PowerOffIcon,
}

const ImageIcon = ({ type }: Props) => {
	const [icon] = useState(() => Icons[type] || '')

	return (
		<img
			src={icon}
			alt={`${type} icon`}
		/>
	)
}
export default ImageIcon
