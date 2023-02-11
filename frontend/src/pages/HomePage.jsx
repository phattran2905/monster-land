import Footer from "../components/Footer"
import Header from "../components/Header"

export default function HomePage() {
	return (
		<div className="container-xl flex flex-col bg-Flamingo-Pink h-screen justify-between">
			<Header />

			<div className="content h-full bg-Amethyst-Purple">
				Content
				<div className="menu-bar"></div>
			</div>

			<Footer />
		</div>
	)
}
