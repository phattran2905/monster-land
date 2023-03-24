import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Footer from "../components/Footer"
import Header from "../components/Header"
import MenuBar from "../components/menu/MenuBar"
import { logout } from "../redux/slices/auth"
import { useLogoutMutation } from "../redux/services/authentication"
import { useGetTrainerInfoQuery } from "../redux/services/trainer"
import Loading from "../components/Loading"
import { updateTrainerInfo } from "../redux/slices/trainer"

export default function HomePage() {
	const navigate = useNavigate()
	const authState = useSelector((state) => state.auth)
	const trainerState = useSelector((state) => state.trainer)
	const dispatch = useDispatch()
	const [fetchLogoutApi] = useLogoutMutation()
	const { data: trainerData } = useGetTrainerInfoQuery({
		jwt_token: authState.jwtToken,
	})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)

		// Redirect to login if not logged in
		if (!authState.isLoggedIn) {
			return navigate("/login")
		}
		// Create first character
		if (trainerData?.message) {
			return navigate("/create-trainer")
		}
		setIsLoading(false)
	}, [authState.isLoggedIn])

	useEffect(() => {
		if (trainerData) {
			dispatch(updateTrainerInfo(trainerData))
		}
	}, [trainerData])

	const handleLogout = async (e) => {
		e.preventDefault()

		await fetchLogoutApi({ jwt_token: authState.jwtToken })
		dispatch(logout())
	}

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div className="container-xl flex flex-col h-screen justify-between">
					<Header />

					<div className="w-full h-full flex flex-row">
						<MenuBar handleLogout={handleLogout} />
					</div>

					<Footer />
				</div>
			)}
		</>
	)
}
