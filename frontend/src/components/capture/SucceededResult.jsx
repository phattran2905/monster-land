import { Link } from "react-router-dom"

import StatusNewImg from "../../assets/img/status-new.png"
import CheckIcon from "../../assets/img/icon/Icon awesome-check.png"
import PokemonType from "../pokemon/Type"

export default function Succeed({ img_name, name, level, type, onSkip }) {
	return (
		<div className="w-full h-full bg-background-img-5 bg-no-repeat bg-cover flex flex-row justify-center">
			<div className="m-10 bg-white rounded-xl w-3/5 flex flex-row shadow-xl shadow-black">
				{/* Left */}
				<div className="w-1/3 bg-Royal-Blue flex flex-col items-center py-16 px-8 relative">
					<div className="absolute top-2 right-6">
						<img
							className="w-32 h-32"
							src={StatusNewImg}
							alt="Status new image"
						/>
					</div>

					<div className="w-72 h-72 mb-10 p-10 border-4 rounded-full border-Midnight-Gray bg-white flex flex-col justify-around items-center shadow-lg shadow-Gold-Sand">
						<img
							src={`/img/pokemon/${img_name}`}
							alt={img_name}
						/>
						<span className="text-Flamingo-Pink font-bold capitalize text-2xl">
							{name}
						</span>
					</div>

					<div className="bg-white w-full p-4 rounded-lg">
						<div className="mx-1 mb-4">
							<span className="text-Indigo-Blue font-bold text-lg mr-6 underline capitalize">
								Level
							</span>
							<span className="font-bold text-Flamingo-Pink text-xl">{level}</span>
						</div>
						<div className="mx-1 mb-4">
							<span className="text-Indigo-Blue font-bold text-lg mr-6 underline capitalize">
								Type
							</span>
							{type.map((t) => (
								<div
									key={t}
									className="inline-block"
								>
									<PokemonType name={t} />
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Right */}
				<div className="w-2/3 bg-white rounded-tr-xl rounded-br-xl px-4 py-6 flex flex-col justify-center items-center">
					<div className="w-60 h-60 bg-Forest-Green rounded-full flex flex-row justify-center items-center mb-6">
						<img
							src={CheckIcon}
							alt="Check Icon"
						/>
					</div>
					<p className="w-3/4 text-Flamingo-Pink font-bold text-center text-4xl break-words">
						<span className="block mb-1 capitalize">Congratulations!</span>
						<span className="capitalize">You captured a wild Pokemon</span>
					</p>

					<div className="mt-32">
						<Link
							to="/collection"
							className="px-8 py-2 border-2 border-Midnight-Gray bg-Midnight-Gray text-white font-bold text-lg rounded-full hover:bg-white hover:text-Indigo-Blue"
						>
							Back to Collection
						</Link>
						<button
							onClick={onSkip}
							className="px-8 py-2 bg-Indigo-Blue text-white font-bold text-lg rounded-full ml-4 hover:bg-Flamingo-Pink"
						>
							Find next
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
