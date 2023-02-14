import { NavLink } from "react-router-dom"
import {useState} from 'react';

import backpackIcon from "../../assets/img/icon/backpack-menu.png"
import userIcon from "../../assets/img/icon/Icon awesome-user.png"
import worldMapIcon from "../../assets/img/icon/pay-per-click_1_.png"
import collectionIcon from "../../assets/img/icon/pokemon-menu.png"
import logoutIcon from "../../assets/img/icon/Icon open-account-logout.png"

const activeClassName =
	"w-full h-20 p-2 flex flex-row justify-center items-center bg-Flamingo-Pink transition-colors duration-500"

const inactiveClassName =
	"w-full h-20 p-2 flex flex-row justify-center items-center bg-Royal-Blue hover:bg-Flamingo-Pink transition-colors duration-500"

export default function NavLinkItem({ path }) {
	const [icon] = useState(() => {
		switch (path) {
			case "/backpack":
				return backpackIcon
			case "/trainer":
				return userIcon
			case "/world-map":
				return worldMapIcon
			case "/collection":
				return collectionIcon
			case "/logout":
				return logoutIcon
		}
	})

	return (
		<NavLink
			to={path}
			className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}
		>
			<img
				src={icon}
				alt="User icon"
			/>
		</NavLink>
	)
}
