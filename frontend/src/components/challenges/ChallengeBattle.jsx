import { useState } from "react"
import BossCard from "./BossCard"
import MonsterCard from "./MonsterCard"
import LoadingDots from "../LoadingDots"

function ChallengeBattle() {
	const [result, setResult] = useState(true)
	const [winner, setWinner] = useState("trainer")

	const renderResult = () => {
		if (winner === "trainer") {
			return (
				<div className="w-52 h-52 bg-Flamingo-Pink rounded-full flex flex-row justify-center items-center shadow-lg shadow-Flamingo-Pink border-8  border-x-Midnight-Gray border-y-white">
					<span className="font-bold text-4xl rounded-full text-white">Won</span>
				</div>
			)
		}

		if (winner === "boss") {
			return (
				<div className="w-52 h-52 bg-black rounded-full flex flex-row justify-center items-center shadow-lg shadow-Midnight-Gray border-8 border-y-light-white">
					<span className="font-bold text-3xl rounded-full text-white">Defeated</span>
				</div>
			)
		}
	}

	return (
		<div className="flex flex-row w-full h-full items-center justify-around ">
			<div className={`w-1/5 ${winner !== "boss" && "opacity-20"}`}>
				<BossCard isWinner={winner === "boss"} />
			</div>

			<div className="flex flex-col justify-center">
				{result ? (
					renderResult()
				) : (
					<>
						<img src="/img/challenges/cross-swords.png" />
						<div className="ml-4">
							<LoadingDots color="bg-Dim-Gray" />
						</div>
					</>
				)}
			</div>

			<div className={`w-1/5 ${winner !== "trainer" && "opacity-20"}`}>
				<MonsterCard isWinner={winner === "trainer"} />
			</div>
		</div>
	)
}
export default ChallengeBattle
