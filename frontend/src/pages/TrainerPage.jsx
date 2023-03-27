import {
	FaCalendarCheck,
	FaAngleLeft,
	FaAngleRight,
	FaExclamationCircle,
	FaUserTag,
} from "react-icons/fa"
import { AiOutlineNumber, AiFillTag, AiTwotoneMail } from "react-icons/ai"
import { useEffect, useState } from "react"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import MenuBar from "../components/menu/MenuBar"
import ProgressBar from "../components/ProgressBar"
import { useGetTrainerInfoQuery, useUpdateTrainerInfoMutation } from "../redux/services/trainer"
import { useDispatch, useSelector } from "react-redux"
import { updateTrainerInfo } from "../redux/slices/trainer"

const totalAvatarImages = 4

function TrainerPage() {
	const navigate = useNavigate()
	const authState = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const trainerState = useSelector((state) => state.trainer)
	const [fetchUpdateInfoApi] = useUpdateTrainerInfoMutation()
	const { data: trainerData } = useGetTrainerInfoQuery({ jwt_token: authState.jwtToken })
	const [error, setError] = useState()
	const [successMsg, setSuccessMsg] = useState()
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [joined, setJoined] = useState("MMM DD, YYYY")
	const [exp, setExp] = useState(0)
	const [levelUpExp, setLevelUpExp] = useState(0)
	const [avatarIndex, setAvatarIndex] = useState(1)

	// Redirect to login if not logged in
	useEffect(() => {
		if (!authState.isLoggedIn) {
			return navigate("/login")
		}
	}, [authState.isLoggedIn])

	useEffect(() => {
		if (trainerData) {
			setName(trainerData.name)
			setEmail(trainerData.email)
			setAvatarIndex(parseInt(trainerData.avatar.split("-")[1], 10))
			setJoined(moment(trainerData.createdAt).format("MMM DD, YYYY"))
			setExp(trainerData.exp)
			setLevelUpExp(trainerData.level_up_exp)
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

	const handleUpdateInfo = async () => {
		setError()
		setSuccessMsg()

		if (name && email) {
			const dataToUpdate = {
				name,
				email,
				avatar: `body-${avatarIndex}.png`,
			}

			const result = await fetchUpdateInfoApi({
				jwt_token: authState.jwtToken,
				data: dataToUpdate,
			})

			if (result.error) {
				setError(result.error.data.message)
			} else {
				setSuccessMsg("Successfully saved.")
				dispatch(updateTrainerInfo(dataToUpdate))
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
						{/* Avatar */}
						<div className="w-1/2 h-full p-10 bg-Indigo-Blue flex flex-col items-center">
							<h2 className="py-2 text-4xl font-bold text-Gold-Sand border-b-4 border-Gold-Sand inline-block">
								Avatar
							</h2>

							<div className="w-full">
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
									<div className="bg-white w-80 py-10 rounded-3xl mt-10 m-4">
										<img
											className="w-44 h-96 mx-auto object-scale-down"
											src={`/img/avatars/body-${avatarIndex}.png`}
											alt={trainerState?.avatar}
										/>
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

								<div className="flex flex-col justify-center py-4 px-8">
									<p className="my-3 text-white underline font-bold text-xl">
										EXP:
									</p>

									<div className="">
										<ProgressBar
											height={"h-3"}
											percentage={Math.floor(exp / levelUpExp)}
											bgColorClass={`bg-white`}
											currentBgColorClass={`bg-Gold-Sand`}
										/>

										<div className="flex flex-row mt-2 justify-between items-center">
											<span className="text-Gold-Sand font-bold text-lg inline-block">
												{exp}
											</span>
											<span className="text-white font-bold text-lg inline-block">
												{levelUpExp}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Info */}
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
										htmlFor="email"
										className="text-Indigo-Blue font-bold flex flex-row text-xl mb-2"
									>
										<AiTwotoneMail className="text-2xl mr-1" />
										Email
									</label>
									<input
										name="email"
										id="email"
										className="border-4 border-Indigo-Blue px-8 py-4 rounded-full focus:border-Flamingo-Pink"
										type="email"
										placeholder="youremail@email.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div className="flex flex-col mb-6">
									<span className="text-Indigo-Blue font-bold flex flex-row text-xl mb-2">
										<AiFillTag className="text-2xl mr-1" />
										Username
									</span>

									<span className="border-4 border-Indigo-Blue px-8 py-4 rounded-full bg-Midnight-Gray text-white">
										{trainerState?.username}
									</span>
								</div>
								<div className="flex flex-col mb-6">
									<span className="text-Indigo-Blue font-bold flex flex-row text-xl mb-2">
										<AiOutlineNumber className="text-2xl mr-1" />
										ID
									</span>

									<span className="border-4 border-Indigo-Blue px-8 py-4 rounded-full bg-Midnight-Gray text-white">
										{trainerState?.uid}
									</span>
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
							</div>

							{error && (
								<div className="bg-Fire-Engine-Red flex flex-row justify-start items-center p-4 self-stretch">
									<FaExclamationCircle className="mx-2 text-xl text-white" />
									<p className="text-white p-1">{error}</p>
								</div>
							)}
							{successMsg && (
								<div className="bg-Forest-Green flex flex-row justify-start items-center p-4 self-stretch">
									<FaExclamationCircle className="mx-2 text-xl text-white" />
									<p className="text-white p-1">{successMsg}</p>
								</div>
							)}
						</div>
					</div>
					{/* Save Button */}
					<div className="w-full mt-10 flex flex-row justify-center items-center">
						<button
							onClick={handleUpdateInfo}
							className="bg-Flamingo-Pink px-16 py-4 text-white rounded-full font-bold text-2xl border-4 border-white hover:border-Flamingo-Pink hover:bg-white hover:text-Flamingo-Pink"
						>
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
