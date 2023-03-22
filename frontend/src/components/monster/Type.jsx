import { useEffect } from "react"
import { useState } from "react"

const monsterTypes = {
	grass: "grass",
	poison: "poison",
	fire: "fire",
	flying: "flying",
	water: "water",
	bug: "bug",
	normal: "normal",
	electric: "electric",
}

export default function Type({ name }) {
	const [bgColorClass, setBgColorClass] = useState("bg-Midnight-Gray")
	const [textColorClass, setTextColorClass] = useState("text-white")

	useEffect(() => {
		switch (name.toLowerCase()) {
			case monsterTypes.grass: {
				setBgColorClass("bg-Grass")
				setTextColorClass("text-black")
				break
			}
			case monsterTypes.poison: {
				setBgColorClass("bg-Poison")
				break
			}
			case monsterTypes.fire: {
				setBgColorClass("bg-Fire")
				break
			}
			case monsterTypes.flying: {
				setBgColorClass("bg-Flying")
				break
			}
			case monsterTypes.water: {
				setBgColorClass("bg-Water")
				break
			}
			case monsterTypes.bug: {
				setBgColorClass("bg-Bug")
				break
			}
			case monsterTypes.normal: {
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
		<div className={`${bgColorClass} py-1 px-4 rounded-md mr-2 shadow-lg`}>
			<span className={`${textColorClass} capitalize font-bold text-sm`}>{name}</span>
		</div>
	)
}
