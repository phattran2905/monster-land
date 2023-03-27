import { useState } from "react"
import backpackIcon from "../assets/img/icon/backpack.png"
import dragonIcon from "../assets/img/icon/font-awesome-dragon.png"
import hydraIcon from "../assets/img/icon/hydra.png"
import mapIcon from "../assets/img/icon/font-awesome-map.png"
import powerOffIcon from "../assets/img/icon/font-awesome-power-off.png"
import userIcon from "../assets/img/icon/font-awesome-user.png"
import incubatorIcon from "../assets/img/icon/incubator.png"

function ImageIcon({ name }) {
	const [icon] = useState(() => {
		switch (name) {
			case "backpack":
				return backpackIcon
			case "user":
				return userIcon
			case "map":
				return mapIcon
			case "monster-collection":
				return dragonIcon
			case "team":
				return hydraIcon
			case "incubation":
				return incubatorIcon
			case "power-off":
				return powerOffIcon
		}
	})

	return (
		<>
			<img
				src={icon}
				alt={`${name} icon`}
			/>
		</>
	)
}
export default ImageIcon
