import pokemonImg from "../assets/img/pokemon/025.png"
import energyIcon from "../assets/img/icon/Icon metro-power.png"

export default function PokemonCard() {
	return (
		<div className="p-4">
			<div className="border-2 border-Midnight-Gray relative rounded-tl-xl rounded-tr-xl p-4">
				<div className="absolute bg-Gold-Sand py-1 px-4 rounded-md flex flex-row justify-center items-center -left-4 -top-4">
					<span className="text-black capitalize font-bold text-sm">Electric</span>
				</div>

				<div className="pokemon-img w-52 h-52">
					<img
						className="w-full h-full"
						src={pokemonImg}
						alt="Pokemon Image"
					/>
				</div>

				<div className="flex flex-row justify-center items-center my-3">
					<span className="text-white capitalize bg-Forest-Moss px-6 py-1 text-sm rounded-xl">
						Lv. 5
					</span>
				</div>

				<div className="flex flex-row justify-center items-center">
					<img
						className="w-5 h-5"
						src={energyIcon}
						alt="Power icon"
					/>{" "}
					<span className="text-Indigo-Blue ml-1 font-bold text-xl">Power:</span>
					<span className="text-black text-xl font-bold px-2">10,000</span>
				</div>
			</div>
			<div className="bg-Royal-Blue px-6 py-3 text-center rounded-bl-xl rounded-br-xl">
				<span className="text-white font-bold text-xl">Pikachu</span>
			</div>
		</div>
	)
}
