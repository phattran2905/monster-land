import { useState, useEffect } from "react"
import ChallengeBattle from "../components/challenges/ChallengeBattle"
import ChallengeStages from "../components/challenges/ChallengeStages"
import ChallengeRewards from "../components/challenges/ChallengeRewards"
import Footer from "../components/Footer"
import Header from "../components/Header"
import MenuBar from "../components/menu/MenuBar"
import { useGetChallengeListQuery } from "../redux/services/challenge"

export default function ChallengesPage() {
	const { data: challengeList } = useGetChallengeListQuery()
	const [showStages, setShowStages] = useState(true)
	const [showBattle, setShowBattle] = useState(false)
	const [showRewards, setShowRewards] = useState(false)

	const onChallenge = (stageUID) => {}

	return (
		<div className="container-xl flex flex-col h-screen justify-between bg-light-white">
			<Header />

			<div className="w-full h-full flex flex-row overflow-hidden">
				<MenuBar />

				<div className="m-10 w-full h-11/12 flex flex-col">
					{showStages && <ChallengeStages onChallenge={onChallenge} />}

					{showBattle && <ChallengeBattle />}

					{showRewards && <ChallengeRewards />}
				</div>
			</div>

			<Footer />
		</div>
	)
}
