import GameIcon from '@components/GameIcon'

interface HeaderProps {
	coins?: number
	diamond?: number
	level?: number
	maxStamina?: number
	stamina?: number
}

const Header = ({
	coins = 0,
	diamond = 0,
	level = 0,
	maxStamina = 0,
	stamina = 0,
}: HeaderProps) => {
	return (
		<header className="h-20 bg-Indigo-Blue flex flex-row">
			<div className="px-8 w-full flex flex-row justify-between items-center">
				<span className="text-white capitalize text-2xl">
					Lv. <span className="font-bold text-2xl"> {level}</span>
				</span>

				<div className="flex flex-row items-center justify-around gap-x-10">
					{/* Diamonds */}
					<div className="flex flex-row items-center gap-x-2">
						<GameIcon
							height={24}
							type="diamond"
							width={24}
						/>
						<span className="text-Gold-Sand font-bold text-xl">{diamond}</span>
					</div>
					{/* Coins */}
					<div className="coins flex flex-row items-center gap-x-2">
						<GameIcon
							height={24}
							type="coin"
							width={24}
						/>
						<span className="text-Gold-Sand font-bold text-xl">{coins}</span>
					</div>
					{/* Stamina */}
					<div className="flex flex-row items-center gap-x-2">
						<GameIcon
							height={24}
							type="pickaxe"
							width={24}
						/>
						<p className="text-xl flex flex-row gap-x-1">
							<span className="text-Gold-Sand font-bold">{stamina}</span>
							<span className="text-white">/{maxStamina}</span>
						</p>
					</div>
				</div>
			</div>
		</header>
	)
}
export default Header
