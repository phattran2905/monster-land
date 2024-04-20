import BossCard from '@components/Card/BossCard'
import ChallengerCard from '@components/Card/ChallengerCard'
import GameIcon from '@components/GameIcon'
import Loading from '@components/Loading'

interface BattleProps {
	result?: boolean
	winner?: string
}
const Battle = ({ result, winner }: BattleProps) => {
	const renderResult = () => {
		if (winner === 'monster') {
			return (
				<div className="w-28 h-28 md:w-40 md:h-40 bg-Flamingo-Pink rounded-full flex flex-row justify-center items-center shadow-lg shadow-Flamingo-Pink border-8  border-y-Flamingo-Pink border-x-white">
					<span className="font-bold md:text-3xl rounded-full text-xl text-white">
						Won
					</span>
				</div>
			)
		}

		if (winner === 'boss') {
			return (
				<div className="w-28 h-28 md:w-40 md:h-40 bg-black rounded-full flex flex-row justify-center items-center shadow-lg shadow-Midnight-Gray border-8 border-y-light-white">
					<span className="font-bold text-3xl rounded-full text-white">
						Defeated
					</span>
				</div>
			)
		}
	}

	return (
		<div className="w-full h-full flex flex-col justify-center">
			<div className="flex flex-row w-full items-center justify-around ">
				<div className={`w-1/3 ${result && winner !== 'boss' && 'opacity-20'}`}>
					<BossCard
					// isWinner={winner === 'boss'}
					// health={bossHealth}
					// boss={boss}
					/>
				</div>

				<div className="flex flex-col justify-center">
					{result ? (
						renderResult()
					) : (
						<>
							<GameIcon type="crossSwords" />
							<div className="ml-4">
								<Loading
									color="bg-Dim-Gray"
									type="dots"
								/>
							</div>
						</>
					)}
				</div>

				<div
					className={`w-1/3 ${result && winner !== 'monster' && 'opacity-20'}`}
				>
					<ChallengerCard
					// health={monsterHealth}
					// isWinner={winner === 'monster'}
					// monster={monster}
					/>
				</div>
			</div>

			{winner === 'monster' && (
				<div className="w-full flex flex-row justify-center items-center md:mt-20 mt-12">
					<button
						className="py-3 px-10 bg-Flamingo-Pink text-white font-bold text-2xl rounded-full hover:bg-Fire-Engine-Red"
						// onClick={onShowRewards}
					>
						Get Rewards
					</button>
				</div>
			)}
			{winner === 'boss' && (
				<div className="w-full flex flex-row justify-center items-center mt-20">
					<button
						className="py-3 px-10 bg-Midnight-Gray text-white font-bold text-2xl rounded-full hover:bg-Indigo-Blue"
						// onClick={onReturnStages}
					>
						Return
					</button>
				</div>
			)}
		</div>
	)
}
export default Battle
