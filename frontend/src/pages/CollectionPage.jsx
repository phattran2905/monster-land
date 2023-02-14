import { useSelector, useDispatch } from "react-redux"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Loading from "../components/Loading"
import MenuBar from "../components/MenuBar"
import PokemonCard from "../components/pokemon/Card"
import { useGetOwnedPokemonQuery } from "../redux/services/collection"

export default function CollectionPage() {
	// Using a query hook automatically fetches data and returns query values
	const { data, error, isLoading } = useGetOwnedPokemonQuery()
	// Individual hooks are also accessible under the generated endpoints:
	// const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')
	console.log(data, error, isLoading)
	console.log(error)
	console.log(isLoading)

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row relative">
				<MenuBar />

				<div className="m-10 w-full overflow-auto shadow-xl">
					{isLoading && <Loading />}

					<div className="">
						{!error && (
							<>
								<div className="bg-Flamingo-Pink rounded-md py-2 px-3 absolute right-5 top-5">
									<span className="text-white font-bold text-sm">{`${data?.length} /50`}</span>
								</div>

								<div className="flex flex-row flex-wrap gap-y-10 gap-x-20 mx-auto">
									{data &&
										data.map((pokemon) => (
											<PokemonCard
												key={pokemon.uid}
												uid={pokemon.uid}
												name={pokemon.name}
												type={pokemon.type}
												level={pokemon.level}
												img_name={pokemon.img_name}
												power={pokemon.power}
												exp={pokemon.exp}
											/>
										))}
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			<Footer />
		</div>
	)
}
