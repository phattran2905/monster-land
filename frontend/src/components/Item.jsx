export default function Item() {
	return (
		<div className="w-1/5 4 h-24 border-2 border-Flamingo-Pink rounded-xl flex flex-row justify-around items-center">
			<div className="w-50 h-50 bg-Gold-Sand">
				<img
					src=""
					alt="Item Icon"
				/>
			</div>
			<div className="flex flex-col justify-between">
				<span className="text-black font-bold text-lg capitalize">Cookie</span>
				<span className="text-Forest-Green">Capture rate +10%</span>
			</div>
			<div>
				<span className="text-black font-bold text-lg">x10</span>
			</div>
		</div>
	)
}
