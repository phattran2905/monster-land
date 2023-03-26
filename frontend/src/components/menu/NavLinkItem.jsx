import { NavLink } from "react-router-dom"
import { useState } from "react"
import ImageIcon from "../ImageIcon"

const activeClassName =
	"w-full h-20 p-2 flex flex-row justify-center items-center bg-Flamingo-Pink transition-colors duration-500"

const inactiveClassName =
	"w-full h-20 p-2 flex flex-row justify-center items-center bg-Royal-Blue hover:bg-Flamingo-Pink transition-colors duration-500"

export default function NavLinkItem({ path, handler }) {
	const [iconName] = useState(() => {
		switch (path) {
			case "/backpack":
				return "backpack"
			case "/trainer":
				return "user"
			case "/map":
				return "map"
			case "/collection":
				return "monster-collection"
			case "/team":
				return "team"
			case "/incubation":
				return "incubation"
			case "/logout":
				return "power-off"
		}
	})

	return (
		<NavLink
            onClick={handler}
			to={path}
			className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}
		>
			<ImageIcon name={iconName} />
		</NavLink>
	)
}
