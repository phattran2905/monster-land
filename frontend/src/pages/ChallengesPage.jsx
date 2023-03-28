import { useState, useEffect } from "react"
import ChallengeBattle from "../components/challenges/ChallengeBattle"
import ChallengeStages from "../components/challenges/ChallengeStages"
import ChallengeRewards from "../components/challenges/ChallengeRewards"
import Footer from "../components/Footer"
import Header from "../components/Header"
import MenuBar from "../components/menu/MenuBar"
import { useBattleBossMutation, useGetChallengeListQuery } from "../redux/services/challenge"
import SelectMonsterModal from "../components/modal/SelectMonsterModal"
import { useSelector } from "react-redux"
import { useGetTrainerInfoQuery } from "../redux/services/trainer"

export default function ChallengesPage() {
	const { data: challengeList } = useGetChallengeListQuery()
	const authState = useSelector((state) => state.auth)
	const [showStages, setShowStages] = useState(true)
	const [showBattle, setShowBattle] = useState(false)
	const [showRewards, setShowRewards] = useState(false)
	const [showSelectMonsterModal, setShowSelectMonsterModal] = useState(false)
	const [selectedBoss, setSelectedBoss] = useState()
	const [challengeUID, setChallengeUID] = useState()
	const [selectedMonster, setSelectedMonster] = useState()
	const [battleBoss] = useBattleBossMutation()
	const { data: trainerData, refetch: refetchTrainerInfo } = useGetTrainerInfoQuery({
		jwt_token: authState.jwtToken,
	})
	const [result, setResult] = useState()
	const [error, setError] = useState()

	useEffect(() => {
		if (showRewards && result === "won") {
			refetchTrainerInfo()
		}
	}, [showRewards])

	const onChallenge = (boss, challenge_uid) => {
		setError()
		setShowSelectMonsterModal(true)
		setSelectedBoss(boss)
		setChallengeUID(challenge_uid)
	}

	const onReturnStages = () => {
		setError()
		setShowBattle(false)
		setShowRewards(false)
		setShowSelectMonsterModal(false)
		setShowStages(true)
	}

	const onSelectMonster = (monster) => {
		setError()
		setSelectedMonster(monster)
		setShowSelectMonsterModal(false)

		onBattleBoss(monster)
	}

	const onShowRewards = () => {
		setShowBattle(false)
		setShowStages(false)
		setShowSelectMonsterModal(false)
		setShowRewards(true)
		setError()
	}

	const onBattleBoss = async (monster) => {
		console.log(selectedBoss)
		console.log(monster)
		const result = await battleBoss({
			jwt_token: authState.jwtToken,
			stageUID: selectedBoss.uid,
			monsterUID: monster.uid,
			challengeUID: challengeUID,
		})

		if (result?.error) {
			setError(result.error.data.message)
			setShowBattle(false)
			setShowStages(true)
		} else {
			const battleResult = result?.data?.result
			if (result?.data.result === "won") {
			} else if (result?.data.result === "defeated") {
			}

			setResult(battleResult)
			setShowStages(false)
			setShowBattle(true)
		}
	}

	return (
		<div className="container-xl flex flex-col h-screen justify-between bg-light-white">
			<Header />

			<div className="w-full h-full flex flex-row overflow-hidden">
				<MenuBar />

				<div className="m-10 w-full h-11/12 flex flex-col items-center relative">
					{/* Error */}
					{error && (
						<div className="bg-Fire-Engine-Red p-4 rounded-xl">
							<p className="text-white font-bold">Error: {error}</p>
						</div>
					)}

					{showStages && <ChallengeStages onChallenge={onChallenge} />}

					{showBattle && (
						<ChallengeBattle
							battleResult={result}
							onReturnStages={onReturnStages}
							onShowRewards={onShowRewards}
							monster={selectedMonster}
							boss={selectedBoss}
						/>
					)}

					{showRewards && result === "won" && (
						<ChallengeRewards onReturnStages={onReturnStages} />
					)}

					{showSelectMonsterModal && (
						<SelectMonsterModal
							onClose={() => setShowSelectMonsterModal(false)}
							onSelectMonster={onSelectMonster}
						/>
					)}
				</div>
			</div>

			<Footer />
		</div>
	)
}
