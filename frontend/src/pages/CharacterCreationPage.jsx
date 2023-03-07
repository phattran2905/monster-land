import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Footer from "../components/Footer"
import logo from "../assets/img/logo/logo-trans-bg.png"
import { FaFemale, FaMale, FaAngleLeft, FaAngleRight, FaExclamationCircle } from "react-icons/fa"
import Male1Image from "../assets/img/trainer/male-1.png"
import Male2Image from "../assets/img/trainer/male-2.png"
import Female1Image from "../assets/img/trainer/female-1.png"
import Female2Image from "../assets/img/trainer/female-2.png"
import { useCreateTrainerMutation, useGetTrainerInfoQuery } from "../redux/services/trainer"
import { getStoredJwtToken } from "../redux/slices/auth"

const avatarImages = {
	male: [Male1Image, Male2Image],
	female: [Female1Image, Female2Image],
}

function CharacterCreationPage() {
	const navigate = useNavigate()
	const [error, setError] = useState()
	const [name, setName] = useState("")
	const [gender, setGender] = useState("male")
	const [avatarIndex, setAvatarIndex] = useState(0)
	const [fetchCreateTrainer] = useCreateTrainerMutation()
	const auth = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const { data: getTrainerData, error: err } = useGetTrainerInfoQuery({
		jwt_token: auth.jwtToken,
	})

	useEffect(() => {
		dispatch(getStoredJwtToken())
		// Redirect to login if not logged in
		if (!auth.isLoggedIn) {
			return navigate("/login", { replace: true })
		}
	}, [auth.isLoggedIn])

	useEffect(() => {
		// Create first character
		if (getTrainerData?.data) {
			return navigate("/home")
		}
	}, [getTrainerData])

	const changeGender = (_gender) => {
		setGender(_gender)
		setAvatarIndex(0)
	}

	const selectAvatarImage = (actionType) => {
		if (actionType === "prev") {
			const index = Math.floor(avatarIndex / avatarImages[gender].length) - 1

			if (index < 0) {
				setAvatarIndex(0)
			} else {
				setAvatarIndex(index)
			}
		} else {
			const index = Math.floor(avatarIndex / avatarImages[gender].length) + 1

			if (index > avatarImages[gender].length) {
				setAvatarIndex(avatarImages[gender].length)
			} else {
				setAvatarIndex(index)
			}
		}
	}

	const handleCreateCharacter = async () => {
		const data = {
			name,
			gender,
			avatar: `${gender}-${avatarIndex}.png`,
		}
		dispatch(getStoredJwtToken())

		const result = await fetchCreateTrainer({ jwt_token: auth.jwtToken, data })

		if (result.error) {
			setError(result.error.message)
		} else {
			return navigate("/home")
		}
	}

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<div className="w-full h-full px-32 py-16 flex justify-center items-start ">
				<div className="w-3/4 flex flex-row justify-start items-start border-2 border-Indigo-Blue rounded-md relative">
					<div className="w-1/2 h-full p-10 bg-Indigo-Blue flex flex-col items-center">
						<h2 className="py-2 text-4xl font-bold text-Gold-Sand border-b-4 border-Gold-Sand inline-block">
							Choose Your Avatar
						</h2>

						<div className="h-full w-full">
							<div className="flex flex-row justify-center items-center">
								<button onClick={() => selectAvatarImage("prev")}>
									<FaAngleLeft
										className={`text-4xl text-white ${
											avatarIndex === 0
												? "opacity-40 hover:cursor-not-allowed"
												: "hover:text-Flamingo-Pink"
										}`}
									/>
								</button>
								<div className="bg-white w-80 py-10 rounded-3xl mt-10 m-4">
									<img
										className="w-44 h-96 mx-auto object-scale-down"
										src={avatarImages[gender][avatarIndex]}
										alt="Avatar image"
									/>
								</div>
								<button onClick={() => selectAvatarImage("next")}>
									<FaAngleRight
										className={`text-4xl text-white ${
											avatarIndex === avatarImages[gender].length - 1
												? "opacity-40 hover:cursor-not-allowed"
												: "hover:text-Flamingo-Pink"
										}`}
									/>
								</button>
							</div>

							<div className="flex flex-row justify-center items-end">
								<button
									onClick={() => changeGender("female")}
									className={`group ${
										gender === "female"
											? "border-b-4 pb-2 m-4 border-b-Flamingo-Pink"
											: "pb-2 m-4 border-b-Flamingo-Pink hover:border-b-4 hover:border-b-white"
									}`}
								>
									<FaFemale
										className={`${
											gender === "female"
												? "text-4xl text-Flamingo-Pink"
												: "text-4xl text-white group-hover:text-Flamingo-Pink"
										}`}
									/>
								</button>
								<button
									onClick={() => changeGender("male")}
									className={`group ${
										gender === "male"
											? "border-b-4 pb-2 m-4 border-b-Flamingo-Pink"
											: "pb-2 m-4 border-b-Flamingo-Pink hover:border-b-4 hover:border-b-white"
									}`}
								>
									<FaMale
										className={`${
											gender === "male"
												? "text-4xl text-Flamingo-Pink"
												: "text-4xl text-white group-hover:text-Flamingo-Pink"
										}`}
									/>
								</button>
							</div>
						</div>
					</div>

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

					<div className="absolute -bottom-10 w-full flex flex-row justify-center items-center">
						<button
							onClick={handleCreateCharacter}
							className="bg-Flamingo-Pink px-16 py-4 text-white rounded-full font-bold text-2xl border-4 border-white hover:border-x-Flamingo-Pink hover:bg-Midnight-Gray"
						>
							Create
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
export default CharacterCreationPage
