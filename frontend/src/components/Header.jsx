import diamondIcon from "../assets/img/icon/diamond_1_.png"
import coinIcon from "../assets/img/icon/coin_1_.png"
import pickaxeIcon from "../assets/img/icon/Pickaxe.png"
import logo from "../assets/img/logo/logo-trans-bg.png"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Header() {
	const trainerState = useSelector((state) => state.trainer)

	return (
		<header className="w-full h-24 bg-Indigo-Blue flex flex-row justify-between">
			<div className="w-24 h-24 flex flex-auto justify-center items-center">
				<Link
					to="/home"
					className="w-3/4 h-3/4"
				>
					<img
						className="w-100 h-100"
						src={logo}
						alt="Monster Land logo"
					/>
				</Link>
			</div>

			<div className="px-6 w-full flex flex-row justify-between items-center">
				<div className="trainer-level flex flex-col items-center justify-center">
					<span className="text-white capitalize font-bold text-2xl">
						Lv. {trainerState?.level}
					</span>
				</div>

				<div className="game-resources h-full w-96 flex flex-row items-center justify-around ">
					<div className="diamonds mx-2 flex flex-row items-center">
						<img
							className="p-3"
							src={diamondIcon}
							alt="Diamond icon"
						/>
						<span className="text-white  text-2xl">{trainerState?.diamond}</span>
					</div>

					<div className="coins mx-2 flex flex-row items-center">
						<img
							className="p-3"
							src={coinIcon}
							alt="Coin icon"
						/>
						<span className="text-white text-2xl">{trainerState?.gold}</span>
					</div>

					<div className="stamina mx-2 flex flex-row items-center text-white">
						<img
							className="p-3"
							src={pickaxeIcon}
							alt="Pickaxe icon"
						/>
						<span className="text-2xl">
							{trainerState?.stamina}/{trainerState?.max_stamina}
						</span>
					</div>
				</div>
			</div>
		</header>
	)
}
