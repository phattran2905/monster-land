'use client'

import Battle from '@components/Battle'
import Challenges from '@components/Challenges'
import Rewards from '@components/Rewards'
import { useState } from 'react'

interface Props {}
const ChallengesPage = (props: Props) => {
	const [showStages, setShowStages] = useState(true)
	const [showBattle, setShowBattle] = useState(true)
	const [showRewards, setShowRewards] = useState(true)
	const [error, setError] = useState<string | undefined>()
	const [result, setResult] = useState('won')

	return (
		<section className="relative h-full flex items-stretch">
			<div className="p-2 sm:p-4 md:p-8 w-full flex flex-col items-center relative">
				{error && (
					<div className="bg-Fire-Engine-Red p-4 rounded-xl">
						<p className="text-white font-bold">Error: {error}</p>
					</div>
				)}
				{/* {showStages && <Challenges stages={[1,2,3,4,5]} />} */}
				{/* {showBattle && (
					<Battle
					battleResult={result}
					boss={selectedBoss}
					monster={selectedMonster}
					onReturnStages={onReturnStages}
					onShowRewards={onShowRewards}
					/>
				)} */}
				{showRewards && result === 'won' && (
					<Rewards
					// monster={winner}
					// onReturnStages={onReturnStages}
					// stage={selectedBoss}
					/>
				)}

				{/* {showSelectMonsterModal && (
				<SelectMonsterModal
					onClose={() => setShowSelectMonsterModal(false)}
					onSelectMonster={onSelectMonster}
				/>
			)} */}
			</div>
		</section>
	)
}
export default ChallengesPage
