import { useState } from "react"
import { FaAngleLeft, FaAngleRight, FaAngleDoubleUp } from "react-icons/fa"
import BossCard from "./BossCard"
import MonsterCard from "./MonsterCard"
import LoadingDots from "../LoadingDots"

function ChallengeBattle() {
	return (
		<div className="flex flex-row w-full h-full items-center justify-around ">
			<BossCard />

			<div className="flex flex-col justify-center">
				<img src="/img/challenges/cross-swords.png" />
				<div className="ml-4">
					<LoadingDots color="bg-Dim-Gray" />
				</div>
			</div>

			<MonsterCard />
		</div>
	)
}
export default ChallengeBattle
