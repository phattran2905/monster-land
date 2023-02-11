import Footer from "../components/Footer"
import Header from "../components/Header"
import MenuBar from "../components/MenuBar"
import PokemonCard from "../components/PokemonCard"

export default function PokemonCollectionPage() {
	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row">
				<MenuBar />

				<div className="m-16 w-full">
					<div className="flex flex-row flex-wrap gap-y-10 gap-x-28 mx-auto">
						<PokemonCard />
						<PokemonCard />
						<PokemonCard />
						<PokemonCard />
						<PokemonCard />
						<PokemonCard />
						<PokemonCard />
						<PokemonCard />
					</div>
				</div>
			</div>

			<Footer />
		</div>
	)
}
