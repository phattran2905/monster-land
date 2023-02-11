import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from './pages/LandingPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<LandingPage />}
				/>
				{/* <Route
					path="users/*"
					element={<Users />}
				/> */}
			</Routes>
		</BrowserRouter>
	)
}

export default App
