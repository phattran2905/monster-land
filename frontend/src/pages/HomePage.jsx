import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Footer from "../components/Footer"
import Header from "../components/Header"
import MenuBar from "../components/menu/MenuBar"
import { getStoredJwtToken, logout } from "../redux/slices/auth"

export default function HomePage() {
	const navigate = useNavigate()
	const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getStoredJwtToken())
        console.log(auth)
        if (!auth.isLoggedIn) {
            return navigate("/login")
        }
	}, [auth.isLoggedIn])

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row">
				<MenuBar />
			</div>

			<Footer />
		</div>
	)
}
