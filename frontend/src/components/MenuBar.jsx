import { Link } from "react-router-dom"

import backpackIcon from "../assets/img/icon/backpack-menu.png"
import userIcon from "../assets/img/icon/Icon awesome-user.png"
import worldMapIcon from "../assets/img/icon/pay-per-click_1_.png"
import collectionIcon from "../assets/img/icon/pokemon-menu.png"
import logoutIcon from "../assets/img/icon/Icon open-account-logout.png"

export default function MenuBar({ activeMenu }) {
	return (
		<section className="w-24 bg-Indigo-Blue">
			<ul className="w-24 h-full flex flex-col items-stretch">
				<li>
					<Link
						to="/trainer"
						className="w-100 h-20 p-2 flex flex-row justify-center items-center bg-Royal-Blue hover:bg-Flamingo-Pink transition-colors duration-500"
					>
						<img
							src={userIcon}
							alt="User icon"
						/>
					</Link>
				</li>
				<li>
					<Link
						to="/pokemon-collection"
						className="w-100 h-20 p-2 flex flex-row justify-center items-center bg-Royal-Blue hover:bg-Flamingo-Pink transition-colors duration-500"
					>
						<img
							src={collectionIcon}
							alt="Pokemon Collection icon"
						/>
					</Link>
				</li>
				<li>
					<Link
						to="/backpack"
						className="w-100 h-20 p-2 flex flex-row justify-center items-center bg-Royal-Blue hover:bg-Flamingo-Pink transition-colors duration-500"
					>
						<img
							src={backpackIcon}
							alt="Backpack icon"
						/>
					</Link>
				</li>
				<li>
					<Link
						to="/world-map"
						className="w-100 h-20 p-2 flex flex-row justify-center items-center bg-Royal-Blue hover:bg-Flamingo-Pink"
					>
						<img
							src={worldMapIcon}
							alt="World map icon"
						/>
					</Link>
				</li>
				<li className="mt-auto">
					<Link
						to="/"
						className="w-100 h-20 p-2 flex flex-row justify-center items-center bg-Royal-Blue hover:bg-Flamingo-Pink"
					>
						<img
							src={logoutIcon}
							alt="Logout icon"
						/>
					</Link>
				</li>
			</ul>
		</section>
	)
}
