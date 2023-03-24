import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Footer from "../components/Footer"
import logo from "../assets/img/logo/logo-trans-bg.png"
import { FaAngleLeft, FaAngleRight, FaExclamationCircle } from "react-icons/fa"
import { useCreateTrainerMutation, useGetTrainerInfoQuery } from "../redux/services/trainer"
import { updateTrainerInfo } from "../redux/slices/trainer"
import Loading from "../components/Loading"

const totalAvatarImages = 4

function CharacterCreationPage() {
	const navigate = useNavigate()
	const [error, setError] = useState()
	const [name, setName] = useState("")
	const [avatarIndex, setAvatarIndex] = useState(1)
	const [fetchCreateTrainer] = useCreateTrainerMutation()
	const authState = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const { data: trainerData } = useGetTrainerInfoQuery({
		jwt_token: authState.jwtToken,
	})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// Redirect to login if not logged in
		if (!authState.isLoggedIn) {
			return navigate("/login")
		}
	}, [authState.isLoggedIn])

	useEffect(() => {
		// Redirect to home if already created a trainer.
		if (trainerData) {
			return navigate("/home")
		}
	}, [trainerData])

	const selectAvatarImage = (actionType) => {
		if (actionType === "prev") {
			const index = avatarIndex - 1
			if (index < 1) {
				setAvatarIndex(1)
			} else {
				setAvatarIndex(index)
			}
		} else {
			const index = avatarIndex + 1
			if (index > totalAvatarImages) {
				setAvatarIndex(totalAvatarImages)
			} else {
				setAvatarIndex(index)
			}
		}
	}

	const handleCreateCharacter = async () => {
		const characterData = {
			name,
			avatar: `body-${avatarIndex}.png`,
		}

		const result = await fetchCreateTrainer({
			jwt_token: authState.jwtToken,
			data: characterData,
		})

		if (result.error) {
			setError(result.error.data.message)
		} else {
			dispatch(updateTrainerInfo(characterData))
			return navigate("/home")
		}
	}

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<div className="w-full h-full px-32 py-16 flex justify-center items-center ">
				{isLoading ? (
					<Loading />
				) : (
					<div className="w-3/4 flex flex-row justify-start items-start border-2 border-Indigo-Blue rounded-md relative shadow-xl">
						{/* Avatar */}
						<div className="w-1/2 h-full p-10 bg-Indigo-Blue flex flex-col items-center">
							<h2 className="py-2 text-4xl font-bold text-Gold-Sand border-b-4 border-Gold-Sand inline-block">
								Choose Your Avatar
							</h2>

							<div className="h-full w-full">
								<div className="flex flex-row justify-center items-center">
									<button onClick={() => selectAvatarImage("prev")}>
										<FaAngleLeft
											className={`text-4xl text-white ${
												avatarIndex <= 1
													? "opacity-40 hover:cursor-not-allowed"
													: "hover:text-Flamingo-Pink"
											}`}
										/>
									</button>
									<div className="bg-white w-80 rounded-3xl mt-10 m-4">
										<img
											className="w-44 h-96 mx-auto object-scale-down my-10"
											src={`/img/avatars/body-${avatarIndex}.png`}
											alt={`Body ${avatarIndex} image`}
										/>
										<div className="h-14 w-full bg-Gold-Sand flex flex-row justify-center items-center rounded-br-3xl rounded-bl-3xl">
											<span className="text-black font-bold text-lg">
												Body {avatarIndex}
											</span>
										</div>
									</div>
									<button onClick={() => selectAvatarImage("next")}>
										<FaAngleRight
											className={`text-4xl text-white ${
												avatarIndex === totalAvatarImages
													? "opacity-40 hover:cursor-not-allowed"
													: "hover:text-Flamingo-Pink"
											}`}
										/>
									</button>
								</div>
							</div>
						</div>

						{/* Name */}
						<div className="w-1/2 h-full py-10 px-4 flex flex-col justify-center items-center">
							<div className="w-1/3 m-10">
								<img
									className="rounded-full"
									src={logo}
									alt="Monster Land logo"
								/>
							</div>

							<div className="flex flex-col justify-center items-center">
								<div className="flex flex-col justify-center items-center">
									<h2 className="py-2 m text-4xl font-bold text-Midnight-Gray inline-block">
										Input Your Name
									</h2>
									<input
										className="py-4 px-8 my-8 border-4 border-Indigo-Blue rounded-lg focus:border-Flamingo-Pink text-center font-bold"
										type="text"
										placeholder="Your Name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>

								{error && (
									<div className="bg-Fire-Engine-Red flex flex-row justify-start items-center p-4 self-stretch">
										<FaExclamationCircle className="mx-2 text-xl text-white" />
										<p className="text-white p-1">{error}</p>
									</div>
								)}
							</div>
						</div>

						{/* Create button */}
						<div className="absolute -bottom-10 w-full flex flex-row justify-center items-center">
							<button
								onClick={handleCreateCharacter}
								className="bg-Flamingo-Pink px-16 py-4 text-white rounded-full font-bold text-2xl border-4 border-white hover:border-x-Flamingo-Pink hover:bg-Midnight-Gray"
							>
								Create
							</button>
						</div>
					</div>
				)}
			</div>
			<Footer />
		</div>
	)
}
export default CharacterCreationPage
