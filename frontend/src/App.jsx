import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import HomePage from "./pages/HomePage"
import PokemonCollectionPage from "./pages/PokemonCollectionPage"
import WorldMap from "./pages/WorldMap"
import Page404 from "./pages/Page404"

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
					path="/world-map"
					element={<WorldMap />}
				/>
				<Route
					path="/*"
					element={<Page404 />}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
