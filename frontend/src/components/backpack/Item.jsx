import { useState } from "react"
import { FaSplotch, FaArrowAltCircleUp, FaShoppingBasket } from "react-icons/fa"

export default function Item({
	uid,
	name,
	img_name,
	effect_property,
	effect_value,
	amount,
	onSelect,
}) {
	return (
		<div className="mx-4 h-80 flex flex-row border-2 border-Royal-Blue">
			<div className="w-60 h-full flex flex-col border-r-2 border-r-Royal-Blue">
				<div className="w-full p-4 h-5/6">
					<img
						className="w-full h-full object-scale-down"
						src={`/img/items/${img_name}`}
						alt={name}
					/>
				</div>
				<div className="w-full h-1/6 bg-Royal-Blue flex flex-col items-stretch justify-center">
					<span className="text-white font-bold text-center text-lg">{name}</span>
				</div>
			</div>

			<div className="w-52 h-full py-4 px-6 flex flex-col justify-between items-stretch border-l-2 border-l-Royal-Blue">
				<div className="flex flex-col mb-3">
					<div className="flex flex-row items-center mb-1">
						<FaSplotch
							className="text-Flamingo-Pink"
							size={16}
						/>
						<span className="ml-1 font-bold capitalize">Effect</span>
					</div>
					<div className="bg-Midnight-Gray flex flex-row justify-center">
						<span className="p-1 font-bold text-white capitalize">
							Boost {effect_property}
						</span>
					</div>
				</div>
				<div className="flex flex-col mb-3">
					<div className="flex flex-row items-center mb-1">
						<FaArrowAltCircleUp
							className="text-Flamingo-Pink"
							size={16}
						/>
						<span className="ml-1 font-bold capitalize">Effect Value</span>
					</div>
					<div className="bg-Midnight-Gray flex flex-row justify-center">
						<span className="p-1 font-bold text-white">
							{effect_property === "incubator" ? (
								<>{`- ${effect_value} seconds`}</>
							) : (
								<>{`+ ${effect_value}`}</>
							)}
						</span>
					</div>
				</div>
				<div className="flex flex-col mb-3">
					<div className="flex flex-row items-center mb-1">
						<FaShoppingBasket
							className="text-Flamingo-Pink"
							size={16}
						/>
						<span className="ml-1 font-bold capitalize">Amount</span>
					</div>
					<div className="bg-Midnight-Gray flex flex-row justify-center">
						<span className="p-1 font-bold text-white capitalize">{amount}</span>
					</div>
				</div>
				<button
					className="p-2 bg-Flamingo-Pink mt-2 text-white font-bold rounded-full hover:bg-Gold-Sand hover:text-Midnight-Gray"
					onClick={() => onSelect()}
				>
					Use
				</button>
			</div>
		</div>
	)
}
