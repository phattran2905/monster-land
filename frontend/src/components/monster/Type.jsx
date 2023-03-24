import { useEffect } from "react"
import { useState } from "react"
import { GiPowerLightning, GiRock, GiWaterSplash, GiFire } from "react-icons/gi"

const monsterTypes = {
	fire: "fire",
	water: "water",
	rock: "rock",
	electric: "electric",
}

export default function Type({ name }) {
	const [bgColorClass, setBgColorClass] = useState("bg-Midnight-Gray")
	const [textColorClass, setTextColorClass] = useState("text-white")

	useEffect(() => {
		switch (name) {
			case monsterTypes.fire: {
				setBgColorClass("bg-Fire")
				break
			}
			case monsterTypes.water: {
				setBgColorClass("bg-Water")
				break
			}
			case monsterTypes.rock: {
				setBgColorClass("bg-Normal")
				break
			}
			case monsterTypes.electric: {
				setBgColorClass("bg-Electric")
				setTextColorClass("text-black")
				break
			}
			default: {
				setTextColorClass("text-white")
				setBgColorClass("bg-Midnight-Gray")
				break
			}
		}
	}, [name])

	return (
		<div
			className={`${bgColorClass} flex flex-row justify-center items-center w-20 p-1 rounded-full`}
		>
			{name === "fire" && (
				<GiFire
					size={14}
					className="text-white"
				/>
			)}
			{name === "water" && (
				<GiWaterSplash
					size={14}
					className="text-white"
				/>
			)}
			{name === "rock" && (
				<GiRock
					size={14}
					className="text-white"
				/>
			)}
			{name === "electric" && (
				<GiPowerLightning
					size={14}
					className="text-white"
				/>
			)}
			<span className={`${textColorClass} ml-1 capitalize font-bold text-sm`}>{name}</span>
		</div>
	)
}
