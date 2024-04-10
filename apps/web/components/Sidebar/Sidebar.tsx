import GameIcon from '@components/GameIcon'
import { IconTypes } from '@components/GameIcon/GameIcon'
import Logo from '@components/Logo'
import clsx from 'clsx'
import Link from 'next/link'

interface SidebarProps {}

interface Menu {
	href: string
	icon: 'logo' | IconTypes
}

const menus: Menu[] = [
	{ href: '/leaderboard', icon: 'logo' },
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
			<div className="flex flex-col">
				{menus?.map(({ href, icon }, index) => (
					<Link
						className={clsx(icon === 'logo' ? 'flex' : '')}
						href={href}
						key={`${href}-${index}`}
					>
						<div
							className={clsx(
								'h-20 flex flex-row justify-center items-center',
								icon !== 'logo' &&
									'bg-Royal-Blue hover:bg-Flamingo-Pink transition-colors duration-500'
							)}
						>
							{icon === 'logo' ? (
								<Logo className="!w-full !h-full p-2" />
							) : (
								<GameIcon type={icon} />
							)}
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}
export default Sidebar
