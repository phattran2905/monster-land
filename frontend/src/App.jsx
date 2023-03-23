import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import HomePage from "./pages/HomePage"
import CharacterCreationPage from "./pages/CharacterCreationPage"
import TrainerPage from "./pages/TrainerPage"
import CollectionPage from "./pages/CollectionPage"
import BackpackPage from "./pages/BackpackPage"
import WorldMapPage from "./pages/WorldMapPage"
import WildForestPage from "./pages/WildForestPage"
import Page404 from "./pages/Page404"
import Page500 from "./pages/Page500"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Loading from "./components/Loading"
import { getStoredJwtToken } from "./redux/slices/auth"

function App() {
	const dispatch = useDispatch()
	const authState = useSelector((state) => state.auth)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
        dispatch(getStoredJwtToken())
		setIsLoading(authState.isLoading)
	}, [authState])

	return (
		<BrowserRouter>
			{isLoading ? (
				<Loading />
			) : (
				<Routes>
					<Route
						path="/"
						element={<LandingPage />}
					/>
					<Route
						path="/login"
						element={<LoginPage />}
					/>
					<Route
						path="/sign-up"
						element={<SignUpPage />}
					/>
					<Route
						path="/home"
						element={<HomePage />}
					/>
					<Route
						path="/create-trainer"
						element={<CharacterCreationPage />}
					/>
					<Route
						path="/trainer"
						element={<TrainerPage />}
					/>
					<Route
						path="/collection"
						element={<CollectionPage />}
					/>
					<Route
						path="/backpack"
						element={<BackpackPage />}
					/>
					<Route path="/map">
						<Route
							index={true}
							element={<WorldMapPage />}
						/>
						<Route path="wild-forest">
							<Route
								index={true}
								element={<WildForestPage />}
							/>
						</Route>
					</Route>
					<Route
						path="/server-error"
						element={<Page500 />}
					/>
					<Route
						path="*"
						element={<Page404 />}
					/>
				</Routes>
			)}
		</BrowserRouter>
	)
}

export default App
