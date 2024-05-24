import ImageIcon from '@components/ImageIcon'
import { IconTypes } from '@components/ImageIcon/ImageIcon'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const activeClassName =
	'w-full h-20 p-2 flex flex-row justify-center items-center bg-Flamingo-Pink transition-colors duration-500'

const inactiveClassName =
	'w-full h-20 p-2 flex flex-row justify-center items-center bg-Royal-Blue hover:bg-Flamingo-Pink transition-colors duration-500'

interface NavLinkItemProps {
	handler?: (e: any) => void
	path: string
}

const iconNames: { [key: string]: IconTypes } = {
	'/backpack': 'backpack',
	'/challenges': 'challenges',
	'/collection': 'monster-collection',
	'/incubation': 'incubation',
	'/logout': 'power-off',
	'/team': 'team',
	'/trainer': 'user',
}

export default function NavLinkItem({ handler, path }: NavLinkItemProps) {
	const [iconName] = useState(iconNames[path] || 'backpack')

	return (
		<NavLink
			className={({ isActive }) =>
				isActive ? activeClassName : inactiveClassName
			}
			onClick={handler}
			to={path}
		>
			<ImageIcon type={iconName} />
		</NavLink>
	)
}
