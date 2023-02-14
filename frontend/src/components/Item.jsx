import { useState } from "react"

export default function Item({
	uid,
	name,
	img_name,
	effect_property,
	effect_value,
	amount,
	isInput,
	onInputChange,
}) {
	const [effect] = useState(() => {
		if (effect_value && effect_property) {
			switch (effect_property) {
				case "capture-rate": {
					return `Capture rate +${effect_value}%`
				}
			}
		}
	})
	const [useAmount, setUseAmount] = useState(0)

	const handleUseAmountChange = (value) => {
		const itemToUse = {
			item_uid: uid,
			amount: value,
		}

		setUseAmount(value)
		onInputChange(itemToUse)
	}

	return (
		<>
			<div className="w-14 h-14 ">
				<img
					className="w-full h-full"
					src={`/img/item/${img_name}`}
					alt="Item Icon"
				/>
			</div>
			<div className="flex flex-col justify-between">
				<span className="text-black font-bold text-lg capitalize">{name}</span>
				<span className="text-Forest-Green font-bold text-sm">{effect}</span>
			</div>
			{!isInput ? (
				<div>
					<span className="text-black font-bold text-lg">{`x ${amount}`}</span>
				</div>
			) : (
				<div>
					<input
						onChange={(e) => handleUseAmountChange(e.target.value)}
						className={`w-14 border-black border-2 px-2 py-1 text-Indigo-Blue font-bold text-lg rounded-md`}
						type="number"
						value={useAmount}
						min={0}
                        max={amount}
						step={1}
                        disabled={amount === 0}
					/>
					<span className="ml-2 text-black font-bold text-xl">/ {amount}</span>
				</div>
			)}
		</>
	)
}
