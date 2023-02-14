import { Link, NavLink } from "react-router-dom"

import backpackIcon from "../assets/img/icon/backpack-menu.png"
import userIcon from "../assets/img/icon/Icon awesome-user.png"
import worldMapIcon from "../assets/img/icon/pay-per-click_1_.png"
import collectionIcon from "../assets/img/icon/pokemon-menu.png"
import logoutIcon from "../assets/img/icon/Icon open-account-logout.png"

const activeClassName =
	"w-full h-20 p-2 flex flex-row justify-center items-center bg-Flamingo-Pink transition-colors duration-500"

const inactiveClassName =
	"w-full h-20 p-2 flex flex-row justify-center items-center bg-Royal-Blue hover:bg-Flamingo-Pink transition-colors duration-500"

export default function MenuBar() {
	return (
		<section className="w-24 bg-Indigo-Blue">
			<ul className="w-24 h-full flex flex-col items-stretch">
				<li>
					<NavLink
						to="/trainer"
						className={({ isActive }) =>
							isActive ? activeClassName : inactiveClassName
						}
					>
						<img
							src={userIcon}
							alt="User icon"
						/>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/pokemon-collection"
						className={({ isActive }) =>
							isActive ? activeClassName : inactiveClassName
						}
					>
						<img
							src={collectionIcon}
							alt="Pokemon Collection icon"
						/>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/backpack"
						className={({ isActive }) =>
							isActive ? activeClassName : inactiveClassName
						}
					>
						<img
							src={backpackIcon}
							alt="Backpack icon"
						/>
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/world-map"
						className={({ isActive }) =>
							isActive ? activeClassName : inactiveClassName
						}
					>
						<img
							src={worldMapIcon}
							alt="World map icon"
						/>
					</NavLink>
				</li>
				<li className="mt-auto">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? activeClassName : inactiveClassName
						}
					>
						<img
							src={logoutIcon}
							alt="Logout icon"
						/>
					</NavLink>
				</li>
			</ul>
		</section>
	)
}
