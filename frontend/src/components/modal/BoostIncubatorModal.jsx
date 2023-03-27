import { FaTimesCircle } from "react-icons/fa"

function BoostIncubatorModal({ onConfirm, onClose }) {
	return (
		<div className="w-screen h-screen absolute bg-white flex flex-row justify-center items-center bg-opacity-80">
			<div className="relative w-1/3 shadow-2xl flex flex-col bg-white rounded-2xl">
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute -right-4 -top-4 bg-white rounded-full"
				>
					<FaTimesCircle
						size={40}
						className="text-Flamingo-Pink hover:text-black"
					/>
				</button>

				{/* Header */}
				<div className="bg-Indigo-Blue p-4">
					<h2 className="text-white font-bold text-xl">Reduce the hatching time?</h2>
				</div>

				<div className="flex flex-col justify-center py-10 items-center">
					<p className="text-lg mb-2">
						It costs you{" "}
						<span className="text-Flamingo-Pink font-bold">15 diamonds</span> to finish
						the incubation.
					</p>
					<p className="text-lg mb-1">Do you want to proceed?</p>
				</div>

				<div className="w-full flex flex-row justify-center items-center my-6">
					<button
						onClick={onConfirm}
						className="bg-Flamingo-Pink py-2 px-8 rounded-full hover:bg-Indigo-Blue"
					>
						<span className="text-white font-bold text-xl">Confirm</span>
					</button>
				</div>
			</div>
		</div>
	)
}
export default BoostIncubatorModal
