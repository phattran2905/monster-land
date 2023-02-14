import { useState } from "react"

export default function Item({ uid, name, img_name, effect_property, effect_value, amount }) {
	const [effect] = useState(() => {
		if (effect_value && effect_property) {
			switch (effect_property) {
				case "capture-rate": {
					return `Capture rate +${effect_value}%`
				}
			}
		}
	})

	return (
		<div className="w-1/5 4 h-24 border-2 border-Flamingo-Pink rounded-xl flex flex-row justify-around items-center">
			<div className="w-14 h-14">
				<img
					className="w-full h-full"
					src={`/img/item/${img_name}`}
					alt="Item Icon"
				/>
			</div>
			<div className="flex flex-col justify-between">
				<span className="text-black font-bold text-lg capitalize">{name}</span>
				<span className="text-Forest-Green font-bold">{effect}</span>
			</div>
			<div>
				<span className="text-black font-bold text-lg">{`x ${amount}`}</span>
			</div>
		</div>
	)
}
