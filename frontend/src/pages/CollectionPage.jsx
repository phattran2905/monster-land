import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Loading from "../components/Loading"
import MenuBar from "../components/menu/MenuBar"
import MonsterCard from "../components/monster/MonsterCard"
import { useGetMonsterCollectionQuery } from "../redux/services/collection"

export default function CollectionPage() {
	const authState = useSelector((state) => state.auth)
	const { data: monsterData, error } = useGetMonsterCollectionQuery({
		jwt_token: authState.jwtToken,
	})
	const navigate = useNavigate()
	const [monsters, setMonsters] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	// Redirect to login if not logged in
	useEffect(() => {
		if (!authState.isLoggedIn) {
			return navigate("/login")
		}
	}, [authState.isLoggedIn])

	// Set monsters
	useEffect(() => {
		if (monsterData) {    console.log(monsterData.monster_list)
			setMonsters(monsterData.monster_list)
			setIsLoading(false)
		}
	}, [monsterData])

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row relative overflow-hidden">
				<MenuBar />

				<div className="m-10 w-full">
					{isLoading ? (
						<Loading />
					) : (
						<div className="h-full flex flex-col shadow-xl rounded-sm overflow-auto bg-light-white">
							<div className="h-full p-14 flex flex-row flex-wrap content-start gap-y-16 gap-x-16 overflow-auto rounded-sm">
								{monsters.map((monster) => (
									<MonsterCard
										key={monster.uid}
										uid={monster.uid}
										name={monster.name}
										type={monster.monster_type}
										level={monster.level}
										img_name={monster.img_name}
										attack={monster.attack}
										defense={monster.defense}
										exp={monster.exp}
										level_up_exp={monster.level_up_exp}
									/>
								))}
							</div>
							{/* Quantity */}
							<div className="bg-white flex flex-row justify-center mt-auto">
								<div className="bg-Midnight-Gray inline-block rounded-full px-10 py-2 my-3">
									<span className="text-Gold-Sand font-bold">
										{monsters.length}
									</span>
									<span className="text-white"> / 50</span>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			<Footer />
		</div>
	)
}
