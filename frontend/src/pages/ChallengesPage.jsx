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

export default function ChallengesPage() {
	const { data: challengeList } = useGetChallengeListQuery()
	const authState = useSelector((state) => state.auth)
	const [showStages, setShowStages] = useState(true)
	const [showBattle, setShowBattle] = useState(false)
	const [showRewards, setShowRewards] = useState(false)
	const [showSelectMonsterModal, setShowSelectMonsterModal] = useState(false)
	const [stageUID, setStageUID] = useState()
	const [challengeUID, setChallengeUID] = useState()
	const [monsterUID, setMonsterUID] = useState()
	const [battleBoss] = useBattleBossMutation()
	const [result, setResult] = useState()

	const onChallenge = (stage_uid, challenge_uid) => {
		console.log(stage_uid)
		setShowSelectMonsterModal(true)
		setStageUID(stage_uid)
		setChallengeUID(challenge_uid)
	}

	const onReturnStages = () => {
		setShowBattle(false)
		setShowRewards(false)
		setShowSelectMonsterModal(false)
		setShowStages(true)
	}

	const onSelectMonster = (monster_uid) => {
		setMonsterUID(monster_uid)
		setShowSelectMonsterModal(false)

		onBattleBoss(monster_uid)
	}

	const onShowRewards = () => {
		setShowBattle(false)
		setShowStages(false)
		setShowSelectMonsterModal(false)
		setShowRewards(true)
	}

	const onBattleBoss = async (monster_uid) => {
		const result = await battleBoss({
			jwt_token: authState.jwtToken,
			stageUID: stageUID,
			monsterUID: monster_uid,
			challengeUID: challengeUID,
		})

		console.log(result)
		const battleResult = result?.data?.result
		if (result?.data.result === "won") {
		} else if (result?.data.result === "defeated") {
		}

		setResult(battleResult)
		setShowStages(false)
		setShowBattle(true)
	}

	return (
		<div className="container-xl flex flex-col h-screen justify-between bg-light-white">
			<Header />

			<div className="w-full h-full flex flex-row overflow-hidden">
				<MenuBar />

				<div className="m-10 w-full h-11/12 flex flex-col items-center relative">
					{showStages && <ChallengeStages onChallenge={onChallenge} />}

					{showBattle && (
						<ChallengeBattle
							battleResult={result}
							onReturnStages={onReturnStages}
							onShowRewards={onShowRewards}
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
