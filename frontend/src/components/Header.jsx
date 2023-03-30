import diamondIcon from "../assets/img/icon/diamond_1_.png"
import coinIcon from "../assets/img/icon/coin_1_.png"
import pickaxeIcon from "../assets/img/icon/Pickaxe.png"
import logo from "../assets/img/logo/logo-trans-bg.png"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useGetTrainerInfoQuery } from "../redux/services/trainer"
import { updateTrainerInfo } from "../redux/slices/trainer"

export default function Header() {
	const authState = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const [diamond, setDiamond] = useState(0)
	const [coins, setCoins] = useState(0)
	const [stamina, setStamina] = useState(0)
	const [maxStamina, setMaxStamina] = useState(0)
	const [level, setLevel] = useState(0)
	const { data: trainerData } = useGetTrainerInfoQuery({
		jwt_token: authState.jwtToken,
	})

	useEffect(() => {
		if (trainerData) {
			dispatch(updateTrainerInfo(trainerData))
			setDiamond(trainerData.diamond)
			setCoins(trainerData.gold)
			setStamina(trainerData.stamina)
			setMaxStamina(trainerData.max_stamina)
			setLevel(trainerData.level)
		}
	}, [trainerData])

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
					<p className="text-white capitalize text-2xl">
						Lv. <span className="font-bold text-2xl"> {level}</span>
					</p>
				</div>

				<div className="game-resources h-full w-96 flex flex-row items-center justify-around ">
					<div className="diamonds mx-2 flex flex-row items-center">
						<img
							className="p-3"
							src={diamondIcon}
							alt="Diamond icon"
						/>
						<span className="text-white font-bold text-2xl">{diamond}</span>
					</div>

					<div className="coins mx-2 flex flex-row items-center">
						<img
							className="p-3"
							src={coinIcon}
							alt="Coin icon"
						/>
						<span className="text-white font-bold text-2xl">{coins}</span>
					</div>

					<div className="stamina mx-2 flex flex-row items-center text-white">
						<img
							className="p-3"
							src={pickaxeIcon}
							alt="Pickaxe icon"
						/>
						<span className="text-2xl font-bold space-x-3">
							{stamina}/{maxStamina}
						</span>
					</div>
				</div>
			</div>
		</header>
	)
}
