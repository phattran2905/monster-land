import Footer from "../components/Footer"
import Header from "../components/Header"
import MenuBar from "../components/menu/MenuBar"

export default function HomePage() {
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
