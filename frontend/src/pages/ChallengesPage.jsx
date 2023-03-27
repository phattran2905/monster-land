import { useState } from "react"
import ChallengeBattle from "../components/challenges/ChallengeBattle"
import ChallengeStages from "../components/challenges/ChallengeStages"
import ChallengeResult from "../components/challenges/ChallengeResult"
import Footer from "../components/Footer"
import Header from "../components/Header"
import MenuBar from "../components/menu/MenuBar"

export default function ChallengesPage() {
	const [showStages, setShowStages] = useState(false)
	const [showBattle, setShowBattle] = useState(true)
    const [showResult, setShowResult] = useState(false)

	const onChallenge = (stageUID) => {}

	return (
		<div className="container-xl flex flex-col h-screen justify-between bg-light-white">
			<Header />

			<div className="w-full h-full flex flex-row overflow-hidden">
				<MenuBar />

				<div className="m-10 w-full h-11/12 flex flex-col">
					{showStages && <ChallengeStages onChallenge={onChallenge} />}

                    {showBattle && <ChallengeBattle />}

                    {showResult && <ChallengeResult />}
				</div>
			</div>

			<Footer />
		</div>
	)
}
