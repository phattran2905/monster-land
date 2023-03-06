
import energyIcon from "../../assets/img/icon/Icon metro-power.png"
import Type from "./Type"
import Image from "./Image"

export default function PokemonCard({ uid, name, type, level, img_name, power, exp }) {
	return (
		<div className="p-4">
			<div className="border-2 border-Midnight-Gray relative rounded-tl-xl rounded-tr-xl p-4">
				<div className="absolute flex flex-row justify-start items-center w-full -top-2 -left-4">
					{type.map((name) => (
						<Type
							key={name}
							name={name}
						/>
					))}
				</div>

				<Image img_name={img_name} />

				<div className="flex flex-row justify-center items-center my-3">
					<span className="text-white capitalize bg-Forest-Moss px-6 py-1 text-sm rounded-xl">
						{`Lv. ${level}`}
					</span>
				</div>

				<div className="flex flex-row justify-center items-center">
					<img
						className="w-5 h-5"
						src={energyIcon}
						alt="Power icon"
					/>{" "}
					<span className="text-Indigo-Blue ml-1 font-bold text-xl">Power:</span>
					<span className="text-black text-xl font-bold px-2">
						{power.toLocaleString("en-US")}
					</span>
				</div>
			</div>
			<div className="bg-Royal-Blue px-6 py-3 text-center rounded-bl-xl rounded-br-xl">
				<span className="text-white font-bold text-xl">{name}</span>
			</div>
		</div>
	)
}
