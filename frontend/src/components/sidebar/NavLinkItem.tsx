import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import ImageIcon from '@components/ImageIcon'
import { IconTypes } from '@/components/ImageIcon/ImageIcon'

const activeClassName =
	'w-full h-20 p-2 flex flex-row justify-center items-center bg-Flamingo-Pink transition-colors duration-500'

const inactiveClassName =
	'w-full h-20 p-2 flex flex-row justify-center items-center bg-Royal-Blue hover:bg-Flamingo-Pink transition-colors duration-500'

interface NavLinkItemProps {
	path: string
	handler?: (e: any) => void
}

const iconNames: { [key: string]: IconTypes } = {
	'/backpack': 'backpack',
	'/trainer': 'user',
	'/challenges': 'challenges',
	'/collection': 'monster-collection',
	'/team': 'team',
	'/incubation': 'incubation',
	'/logout': 'power-off',
}

export default function NavLinkItem({ path, handler }: NavLinkItemProps) {
	const [iconName] = useState(iconNames[path] || 'backpack')

	return (
		<NavLink
			onClick={handler}
			to={path}
			className={({ isActive }) =>
				isActive ? activeClassName : inactiveClassName
			}
		>
			<ImageIcon type={iconName} />
		</NavLink>
	)
}
