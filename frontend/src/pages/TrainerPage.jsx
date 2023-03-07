import {
	FaSignInAlt,
	FaCalendarCheck,
	FaTransgender,
	FaAngleLeft,
	FaAngleRight,
	FaExclamationCircle,
	FaUserTag,
} from "react-icons/fa"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import MenuBar from "../components/menu/MenuBar"
import ProgressBar from "../components/ProgressBar"
import { useGetTrainerInfoQuery, useUpdateTrainerInfoMutation } from "../redux/services/trainer"
import { useDispatch, useSelector } from "react-redux"
import { getStoredJwtToken } from "../redux/slices/auth"
import Male1Image from "../assets/img/trainer/male-1.png"
import Male2Image from "../assets/img/trainer/male-2.png"
import Female1Image from "../assets/img/trainer/female-1.png"
import Female2Image from "../assets/img/trainer/female-2.png"

const avatarImages = {
	male: [Male1Image, Male2Image],
	female: [Female1Image, Female2Image],
}

function TrainerPage() {
	const navigate = useNavigate()
	const auth = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const { data: trainerData } = useGetTrainerInfoQuery({ jwt_token: auth.jwtToken })
	const [fetchUpdateInfoApi] = useUpdateTrainerInfoMutation()
	const [error, setError] = useState()
	const [name, setName] = useState("")
	const [gender, setGender] = useState("male")
	const [joined, setJoined] = useState("yyyy/mm/dd")
	// const [lastLogin, setLastLogin] = useState("yyyy/mm/dd")
	const [exp, setExp] = useState(0)
	const [maxExp, setMaxExp] = useState(0)
	const [avatarName, setAvatarName] = useState("")
	const [avatarIndex, setAvatarIndex] = useState(0)

	useEffect(() => {
		dispatch(getStoredJwtToken())

		// Redirect to login if not logged in
		if (!auth.isLoggedIn) {
			return navigate("/login", { replace: true })
		}

	}, [auth.isLoggedIn])

	useEffect(() => {
		console.log(trainerData)
		if (trainerData) {
			setName(trainerData.data.name)
			setGender(trainerData.data.gender)

			const dateString = trainerData.data.createdAt
			const joinedDate = new Date(dateString)
			setJoined(
				new Intl.DateTimeFormat("en-US", {
					month: "short",
					day: "numeric",
					year: "numeric",
				}).format(joinedDate)
			)
			setExp(trainerData.data.exp)
			setMaxExp(trainerData.data.level_up_exp)
			setAvatarName(trainerData.data.avatar)
			const avatarIdx = trainerData.data.avatar.split("-")[1].slice(0, 1)
			setAvatarIndex(parseInt(avatarIdx, 10))
		} else {
		}
	}, [trainerData])

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

    const handleUpdateInfo = async () => {
        if (name && gender) {
            const data = {
                name,
                gender,
                avatar: `${gender}-${avatarIndex}.png`,
            }

            const result = await fetchUpdateInfoApi({ jwt_token: auth.jwtToken, data })
    
            if (result.error) {
                setError(result.error.message)
            } else {
                return navigate("/trainer")
            }
        }
    }

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />
			<div className="w-full h-full flex flex-row">
				<MenuBar />
				<div className="w-full px-32 py-12 flex flex-col justify-center items-center">
					<div className="w-3/4 flex flex-row justify-start items-start border-2 border-Indigo-Blue rounded-md relative">
						<div className="w-1/2 h-full p-10 bg-Indigo-Blue flex flex-col items-center">
							<h2 className="py-2 text-4xl font-bold text-Gold-Sand border-b-4 border-Gold-Sand inline-block">
								Avatar
							</h2>

							<div className="w-full">
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
											alt={avatarName}
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

								<div className="flex flex-col justify-center py-4 px-8">
									<p className="my-3 text-white underline font-bold text-xl">
										EXP:
									</p>

									<div className="">
										<ProgressBar
											height={"h-3"}
											percentage={Math.floor(exp / maxExp)}
											bgColorClass={`bg-white`}
											currentBgColorClass={`bg-Gold-Sand`}
										/>

										<div className="flex flex-row mt-2 justify-between items-center">
											<span className="text-Gold-Sand font-bold text-lg inline-block">
												{exp}
											</span>
											<span className="text-white font-bold text-lg inline-block">
												{maxExp}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="w-1/2 h-full p-16 flex flex-col items-center">
							<div className="w-full flex flex-col items-stretch my-4">
								<div className="flex flex-col mb-6">
									<label
										htmlFor="name"
										className="text-Indigo-Blue font-bold flex flex-row text-xl mb-2"
									>
										<FaUserTag className="text-2xl mr-1" />
										Name
									</label>
									<input
										name="name"
										id="name"
										className="border-4 border-Indigo-Blue px-8 py-4 rounded-full focus:border-Flamingo-Pink"
										type="text"
										placeholder="Your Name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="flex flex-col mb-6">
									<label
										htmlFor="gender"
										className="text-Indigo-Blue font-bold flex flex-row text-xl mb-2"
									>
										<FaTransgender className="text-2xl mr-1" />
										Gender
									</label>
									<select
										name="gender"
										id="gender"
										className="border-4 border-Indigo-Blue px-8 py-4 rounded-full focus:border-Flamingo-Pink"
										value={gender}
										onChange={(e) => setGender(e.target.value)}
									>
										<option value="female">Female</option>
										<option value="male">Male</option>
									</select>
								</div>
								<div className="flex flex-col mb-6">
									<span className="text-Indigo-Blue font-bold flex flex-row text-xl mb-2">
										<FaCalendarCheck className="text-2xl mr-1" />
										Joined
									</span>
									<span className="border-4 border-Indigo-Blue px-8 py-4 rounded-full bg-Midnight-Gray text-white">
										{joined}
									</span>
								</div>
								{/* <div className="flex flex-col mb-6">
									<span className="text-Indigo-Blue font-bold flex flex-row text-xl mb-2">
										<FaSignInAlt className="text-2xl mr-1" />
										Last login
									</span>

									<span className="border-4 border-Indigo-Blue px-8 py-4 rounded-full bg-Midnight-Gray text-white">
										{lastLogin}
									</span>
								</div> */}
							</div>

							{error && (
								<div className="bg-Fire-Engine-Red flex flex-row justify-start items-center p-4 self-stretch">
									<FaExclamationCircle className="mx-2 text-xl text-white" />
									<p className="text-white p-1">{error}</p>
								</div>
							)}
						</div>
					</div>
					<div className="w-full mt-10 flex flex-row justify-center items-center">
						<button 
                        onClick={handleUpdateInfo}
                        className="bg-Flamingo-Pink px-16 py-4 text-white rounded-full font-bold text-2xl border-4 border-white hover:border-Flamingo-Pink hover:bg-white hover:text-Flamingo-Pink">
							Save changes
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
export default TrainerPage
