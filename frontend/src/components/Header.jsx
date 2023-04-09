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
	const trainerState = useSelector((state) => state.trainer)
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
		}
	}, [trainerData])
    
    useEffect(() => {
		if (trainerState) {
			setDiamond(trainerState.diamond)
			setCoins(trainerState.gold)
			setStamina(trainerState.stamina)
			setMaxStamina(trainerState.max_stamina)
			setLevel(trainerState.level)
		}
	}, [trainerState])

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
					<div className="diamonds mx-3 flex flex-row items-center">
						<img
							className="p-3"
							src={diamondIcon}
							alt="Diamond icon"
						/>
						<span className="text-Gold-Sand font-bold text-2xl">{diamond}</span>
					</div>

					<div className="coins mx-3 flex flex-row items-center">
						<img
							className="p-3"
							src={coinIcon}
							alt="Coin icon"
						/>
						<span className="text-Gold-Sand font-bold text-2xl">{coins}</span>
					</div>

					<div className="stamina mx-3 flex flex-row items-center text-white">
						<img
							className="p-3"
							src={pickaxeIcon}
							alt="Pickaxe icon"
						/>
						<p className="text-2xl">
							<span className="text-Gold-Sand font-bold mr-1">{stamina}</span>/{maxStamina}
						</p>
					</div>
				</div>
			</div>
		</header>
	)
}
