import GameIcon from '@components/GameIcon'
import { IconTypes } from '@components/GameIcon/GameIcon'
import Logo from '@components/Logo'
import clsx from 'clsx'
import Link from 'next/link'

type SidebarProps = {}

interface Menu {
	href: string
	icon: 'logo' | IconTypes
}

const menus: Menu[] = [
	{ href: '/game', icon: 'logo' },
	{ href: '/trainer', icon: 'user' },
	{ href: '/backpack', icon: 'backpack' },
	{ href: '/collection', icon: 'monster-collection' },
	{ href: '/incubation', icon: 'incubation' },
	{ href: '/challenges', icon: 'challenges' },
	{ href: '/logout', icon: 'power-off' },
]

const Sidebar = ({}: SidebarProps) => {
	return (
		<section className="w-24 h-full bg-Indigo-Blue">
			<ul className="flex flex-col">
				{menus?.map(({ href, icon }, index) => (
					<li
						className={clsx(
							'h-20 flex flex-row justify-center items-center',
							icon !== 'logo' &&
								'bg-Royal-Blue hover:bg-Flamingo-Pink transition-colors duration-500'
						)}
						key={`${href}-${index}`}
					>
						<Link
							className={clsx(icon === 'logo' ? 'relative flex' : '')}
							href={href}
						>
							{icon === 'logo' ? (
								<Logo className="!w-full !h-full p-2" />
							) : (
								<GameIcon type={icon} />
							)}
						</Link>
					</li>
				))}
			</ul>
		</section>
	)
}
export default Sidebar
