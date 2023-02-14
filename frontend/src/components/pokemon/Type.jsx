import { useEffect } from "react"
import { useState } from "react"

const pokemonTypes = {
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
			case pokemonTypes.grass: {
				setBgColorClass("bg-Grass")
				setTextColorClass("text-black")
				break
			}
			case pokemonTypes.poison: {
				setBgColorClass("bg-Poison")
				break
			}
			case pokemonTypes.fire: {
				setBgColorClass("bg-Fire")
				break
			}
			case pokemonTypes.flying: {
				setBgColorClass("bg-Flying")
				break
			}
			case pokemonTypes.water: {
				setBgColorClass("bg-Water")
				break
			}
			case pokemonTypes.bug: {
				setBgColorClass("bg-Bug")
				break
			}
			case pokemonTypes.normal: {
				setBgColorClass("bg-Normal")
				break
			}
			case pokemonTypes.electric: {
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
		<div className={`${bgColorClass} py-1 px-4 rounded-md mr-2 `}>
			<span className={`${textColorClass} capitalize font-bold text-sm`}>{name}</span>
		</div>
	)
}
