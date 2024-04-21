'use client'

import GameIcon from '@components/GameIcon'
import { IconTypes } from '@components/GameIcon/GameIcon'
import Logo from '@components/Logo'
import { createClient } from '@utils/supabase/client'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
]

const Sidebar = ({}: SidebarProps) => {
	const router = useRouter()

	const logOut = async () => {
		const supabase = createClient()
		await supabase.auth.signOut()
		router.push('/login')
	}

	return (
		<nav className="w-24 bg-Indigo-Blue">
			<div className="flex flex-col">
				{menus?.map(({ href, icon }, index) => (
					<Link
						className={clsx(icon === 'logo' ? 'flex' : '')}
						href={href !== '/logout' ? href : '/'}
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
				<button onClick={logOut}>
					<div
						className={clsx(
							'h-20 flex flex-row justify-center items-center',
							'bg-Royal-Blue hover:bg-Flamingo-Pink transition-colors duration-500'
						)}
					>
						<GameIcon type={'power-off'} />
					</div>
				</button>
			</div>
		</nav>
	)
}
export default Sidebar
