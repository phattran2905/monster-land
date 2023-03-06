import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import HomePage from "./pages/HomePage"
import CollectionPage from "./pages/CollectionPage"
import BackpackPage from "./pages/BackpackPage"
import WorldMapPage from "./pages/WorldMapPage"
import WildForestPage from "./pages/WildForestPage"
import Page404 from "./pages/Page404"
import Page500 from "./pages/Page500"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<LandingPage />}
				/>
				<Route
					path="/home"
					element={<HomePage />}
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
		</BrowserRouter>
	)
}

export default App
