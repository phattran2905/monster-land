import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Footer from "../components/Footer"
import Header from "../components/Header"
import MenuBar from "../components/menu/MenuBar"
import { logout } from "../redux/slices/auth"
import { useLogoutMutation } from "../redux/services/authentication"
import { useGetTrainerInfoQuery } from "../redux/services/trainer"
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

	useEffect(() => {

		// Redirect to login if not logged in
		if (!authState.isLoggedIn) {
			return navigate("/login")
		}

		// Create first character
		if (!trainerData) {
			return navigate("/create-trainer")
		} else {
			dispatch(updateTrainerInfo(trainerData))
		}
	}, [authState.isLoggedIn])

	const handleLogout = async (e) => {
		e.preventDefault()

		await fetchLogoutApi({ jwt_token: authState.jwtToken })
		dispatch(logout())
	}

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row">
				<MenuBar handleLogout={handleLogout} />

				<div className="w-full px-32 py-12 flex flex-col justify-center items-center">

				</div>
			</div>

			<Footer />
		</div>
	)
}
