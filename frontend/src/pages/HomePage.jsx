import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GiBroadsword, GiLightningShield } from 'react-icons/gi'
import { AiOutlineNumber } from 'react-icons/ai'
import { TbAwardFilled } from 'react-icons/tb'
import { FaChessRook } from 'react-icons/fa'
import Loading from '@components/Loading'
import Footer from '@components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/sidebar/Sidebar'
import { useGetTrainerInfoQuery } from '../redux/services/trainer'
import { updateTrainerInfo } from '../redux/slices/trainer'
import { useGetTopMonstersQuery } from '../redux/services/monster'
import Container from '../components/Container'

export default function HomePage() {
	const navigate = useNavigate()
	const authState = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const {
		data: trainerData,
		error,
		isFetching,
	} = useGetTrainerInfoQuery({
		jwt_token: authState.jwtToken,
	})
	const { data: topMonsters } = useGetTopMonstersQuery()
	const [topLevel, setTopLevel] = useState()
	const [topAttack, setTopAttack] = useState()
	const [topDefense, setTopDefense] = useState()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		document.title = 'Monster Land - Home'
	}, [])

	useEffect(() => {
		// Redirect to login if not logged in
		if (!authState.isLoggedIn) {
			return navigate('/login')
		}
	}, [authState])

	useEffect(() => {
		// Create first character
		if (!trainerData && error?.status === 404) {
			return navigate('/create-trainer')
		}

		if (trainerData) {
			dispatch(updateTrainerInfo(trainerData))
			setIsLoading(false)
		}
	}, [isFetching])

	useEffect(() => {
		if (topMonsters) {
			// Level > Attack > Defense
			const [level, attack, defense] = topMonsters
			setTopLevel(level)
			setTopAttack(attack)
			setTopDefense(defense)
			setIsLoading(false)
		}
	}, [topMonsters])

	return (
		<Container>
			<div className="w-full flex flex-row items-stretch">
				<Sidebar />
				<div className="flex flex-col w-full">
					<Header />

					<div className="flex flex-row">
						{/* Golden Board */}
						<div className="w-full h-full px-12 py-5 flex flex-col items-center">
							{/* H1 */}
							<div className="w-[28rem] p-4 rounded-full shadow-md bg-[#FFFD82]">
								<div className="flex flex-row justify-around items-center relative">
									<h1 className=" font-bold text-3xl text-center uppercase text-Midnight-Gray">
										Golden Board
									</h1>
									<div className="absolute left-0 top-8 rotate-[30deg]">
										<TbAwardFilled
											size={40}
											className="text-Midnight-Gray"
										/>
									</div>
									<div className="absolute right-0 top-8 -rotate-[30deg]">
										<TbAwardFilled
											size={40}
											className="text-Midnight-Gray"
										/>
									</div>
								</div>
							</div>
							{/* Monsters */}
							<div className="mt-16 w-full flex flex-row justify-around items-center flex-wrap gap-6">
								{isLoading ? (
									<Loading />
								) : (
									<>
										{/* Top Level */}
										<div className="flex flex-col w-80 justify-between gap-y-4 bg-white">
											{/* Title */}
											<div className="bg-Flamingo-Pink shadow-md shadow-Amethyst-Purple rounded-lg p-4 flex flex-row justify-center items-center">
												<FaChessRook
													size={24}
													className="text-Gold-Sand"
												/>
												<h2 className="text-2xl font-bold text-white mx-2">
													No.1 Level
												</h2>
											</div>
											{/* Image */}
											<div className="w-full h-96 rounded-lg shadow-lg shadow-Gold-Sand border-2 border-light-white">
												<img
													className="w-full h-full object-scale-down"
													src={`img/monsters/${topLevel?.img_name}`}
												/>
											</div>
											{/* Details */}
											<div className="w-full rounded-lg shadow-md border border-light-white">
												{/* Name */}
												<div className="p-4 bg-Indigo-Blue w-full">
													<p className="font-bold text-white text-center text-xl">
														{topLevel?.name}
													</p>
												</div>
												{/* Attribute */}
												<div className="py-4 px-8 flex flex-col gap-y-3">
													{/* UID */}
													<div className="flex flex-row justify-between items-center">
														<div className="flex flex-row items-center">
															<AiOutlineNumber
																size={22}
																className="text-Flamingo-Pink"
															/>
															<span className="text-Indigo-Blue font-bold mx-2 text-lg">
																UID
															</span>
														</div>
														<div className="bg-Flamingo-Pink rounded-lg py-2 px-4">
															<span className="font-bold text-white">
																{topLevel?.uid}
															</span>
														</div>
													</div>
													{/* Level */}
													<div className="flex flex-row justify-between items-center">
														<div className="flex flex-row items-center">
															<FaChessRook
																size={22}
																className="text-Flamingo-Pink"
															/>
															<span className="text-Indigo-Blue font-bold mx-2 text-lg">
																Level
															</span>
														</div>
														<div className="bg-Flamingo-Pink rounded-lg py-2 px-4">
															<span className="font-bold text-white">
																{topLevel?.level}
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>

										{/* Top Attack */}
										<div className="flex flex-col w-80 justify-between gap-y-4 bg-white">
											{/* Title */}
											<div className="bg-Flamingo-Pink shadow-md shadow-Amethyst-Purple rounded-lg p-4 flex flex-row justify-center items-center">
												<GiBroadsword
													size={24}
													className="text-Gold-Sand"
												/>
												<h2 className="text-2xl font-bold text-white mx-2">
													No.1 Attack
												</h2>
											</div>
											{/* Image */}
											<div className="w-full h-96 rounded-lg shadow-lg shadow-Gold-Sand border-2 border-light-white">
												<img
													className="w-full h-full object-scale-down"
													src={`img/monsters/${topAttack?.img_name}`}
												/>
											</div>
											{/* Details */}
											<div className="w-full rounded-lg shadow-md border border-light-white">
												{/* Name */}
												<div className="p-4 bg-Indigo-Blue w-full">
													<p className="font-bold text-white text-center text-xl">
														{topAttack?.name}
													</p>
												</div>
												{/* Attribute */}
												<div className="py-4 px-8 flex flex-col gap-y-3">
													{/* UID */}
													<div className="flex flex-row justify-between items-center">
														<div className="flex flex-row items-center">
															<AiOutlineNumber
																size={22}
																className="text-Flamingo-Pink"
															/>
															<span className="text-Indigo-Blue font-bold mx-2 text-lg">
																UID
															</span>
														</div>
														<div className="bg-Flamingo-Pink rounded-lg py-2 px-4">
															<span className="font-bold text-white">
																{topLevel?.uid}
															</span>
														</div>
													</div>
													{/* Level */}
													<div className="flex flex-row justify-between items-center">
														<div className="flex flex-row items-center">
															<GiBroadsword
																size={22}
																className="text-Flamingo-Pink"
															/>
															<span className="text-Indigo-Blue font-bold mx-2 text-lg">
																Attack
															</span>
														</div>
														<div className="bg-Flamingo-Pink rounded-lg py-2 px-4">
															<span className="font-bold text-white">
																{topAttack?.attack}
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>

										{/* Top Defense */}
										<div className="flex flex-col w-80 justify-between gap-y-4 bg-white">
											{/* Title */}
											<div className="bg-Flamingo-Pink shadow-md shadow-Amethyst-Purple rounded-lg p-4 flex flex-row justify-center items-center">
												<GiLightningShield
													size={24}
													className="text-Gold-Sand"
												/>
												<h2 className="text-2xl font-bold text-white mx-2">
													No.1 Level
												</h2>
											</div>
											{/* Image */}
											<div className="w-full h-96 rounded-lg shadow-lg shadow-Gold-Sand border-2 border-light-white">
												<img
													className="w-full h-full object-scale-down"
													src={`img/monsters/${topDefense?.img_name}`}
												/>
											</div>
											{/* Details */}
											<div className="w-full rounded-lg shadow-md border border-light-white">
												{/* Name */}
												<div className="p-4 bg-Indigo-Blue w-full">
													<p className="font-bold text-white text-center text-xl">
														{topDefense?.name}
													</p>
												</div>
												{/* Attribute */}
												<div className="py-4 px-8 flex flex-col gap-y-3">
													{/* UID */}
													<div className="flex flex-row justify-between items-center">
														<div className="flex flex-row items-center">
															<AiOutlineNumber
																size={22}
																className="text-Flamingo-Pink"
															/>
															<span className="text-Indigo-Blue font-bold mx-2 text-lg">
																UID
															</span>
														</div>
														<div className="bg-Flamingo-Pink rounded-lg py-2 px-4">
															<span className="font-bold text-white">
																{topLevel?.uid}
															</span>
														</div>
													</div>
													{/* Level */}
													<div className="flex flex-row justify-between items-center">
														<div className="flex flex-row items-center">
															<GiLightningShield
																size={22}
																className="text-Flamingo-Pink"
															/>
															<span className="text-Indigo-Blue font-bold mx-2 text-lg">
																Defense
															</span>
														</div>
														<div className="bg-Flamingo-Pink rounded-lg py-2 px-4">
															<span className="font-bold text-white">
																{topDefense?.defense}
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</>
								)}
							</div>
						</div>
					</div>

					<div className="mt-auto">
						<Footer />
					</div>
				</div>
			</div>
		</Container>
	)
}
