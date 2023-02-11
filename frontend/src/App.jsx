import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import HomePage from "./pages/HomePage"
import PokemonCollectionPage from "./pages/PokemonCollectionPage"
import BackpackPage from "./pages/BackpackPage"
import WorldMap from "./pages/WorldMap"
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
					path="/pokemon-collection"
					element={<PokemonCollectionPage />}
				/>
				<Route
					path="/backpack"
					element={<BackpackPage />}
				/>
				<Route
					path="/world-map"
					element={<WorldMap />}
				/>
				<Route
					path="/*"
					element={<Page404 />}
				/>
				{/* <Route
					path="/*"
					element={<Page500 />}
				/> */}
			</Routes>
		</BrowserRouter>
	)
}

export default App
