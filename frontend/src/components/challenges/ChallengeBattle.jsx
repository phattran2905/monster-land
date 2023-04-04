import { useEffect, useState } from "react"
import BossCard from "./BossCard"
import MonsterCard from "./MonsterCard"
import LoadingDots from "../LoadingDots"
import { useBattleBossMutation } from "../../redux/services/challenge"
import { useSelector } from "react-redux"

function ChallengeBattle({ battleResult, onReturnStages, onShowRewards, monster, boss }) {
	const [result, setResult] = useState(false)
	const [winner, setWinner] = useState()
	const [bossHealth, setBossHealth] = useState(100)
	const [monsterHealth, setMonsterHealth] = useState(100)
console.log(boss)
	useEffect(() => {
		setTimeout(() => {
			setBossHealth(85)
			setMonsterHealth(65)
		}, 2000)

		setTimeout(() => {
			setBossHealth(25)
			setMonsterHealth(35)
		}, 3000)

		setTimeout(async () => {
			if (battleResult === "won") {
				setResult(true)
				setWinner("monster")
				setBossHealth(0)
			} else {
				setResult(true)
				setWinner("boss")
				setMonsterHealth(0)
			}
		}, 4000)
	}, [])

	const renderResult = () => {
		if (winner === "monster") {
			return (
				<div className="w-52 h-52 bg-Flamingo-Pink rounded-full flex flex-row justify-center items-center shadow-lg shadow-Flamingo-Pink border-8  border-y-Flamingo-Pink border-x-white">
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
		<div className="w-full h-full flex flex-col justify-center">
			<div className="flex flex-row w-full items-center justify-around ">
				<div className={`w-1/5 ${result && winner !== "boss" && "opacity-20"}`}>
					<BossCard
						isWinner={winner === "boss"}
						health={bossHealth}
						boss={boss}
					/>
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

				<div className={`w-1/5 ${result && winner !== "monster" && "opacity-20"}`}>
					<MonsterCard
						isWinner={winner === "monster"}
						health={monsterHealth}
						monster={monster}
					/>
				</div>
			</div>

			{winner === "monster" && (
				<div className="w-full flex flex-row justify-center items-center mt-20">
					<button
						onClick={onShowRewards}
						className="py-3 px-10 bg-Flamingo-Pink text-white font-bold text-2xl rounded-full hover:bg-Fire-Engine-Red"
					>
						Get Rewards
					</button>
				</div>
			)}
			{winner === "boss" && (
				<div className="w-full flex flex-row justify-center items-center mt-20">
					<button
						onClick={onReturnStages}
						className="py-3 px-10 bg-Midnight-Gray text-white font-bold text-2xl rounded-full hover:bg-Indigo-Blue"
					>
						Return
					</button>
				</div>
			)}
		</div>
	)
}
export default ChallengeBattle
