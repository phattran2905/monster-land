import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Footer from "../components/Footer"
import Header from "../components/Header"
import MenuBar from "../components/menu/MenuBar"
import { getStoredJwtToken, logout } from "../redux/slices/auth"
import { useLogoutMutation } from "../redux/services/authentication"
import { useGetTrainerInfoQuery } from "../redux/services/trainer"

export default function HomePage() {
	const navigate = useNavigate()
	const auth = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const [fetchLogoutApi] = useLogoutMutation()
	const { data: getTrainerData, error } = useGetTrainerInfoQuery({ jwt_token: auth.jwtToken })

	useEffect(() => {
		dispatch(getStoredJwtToken())

		// Redirect to login if not logged in
		if (!auth.isLoggedIn) {
			return navigate("/login", { replace: true })
		}

	}, [auth.isLoggedIn])


    useEffect(() => {
		// Create first character
		if (!getTrainerData?.data) {
			return navigate("/create-trainer")
		}
    }, [getTrainerData])

	const handleLogout = async (e) => {
		e.preventDefault()

		await fetchLogoutApi({ jwt_token: auth.jwtToken })
		dispatch(logout())
	}

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row">
				<MenuBar handleLogout={handleLogout} />
			</div>

			<Footer />
		</div>
	)
}
