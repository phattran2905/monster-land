import { FaTimesCircle } from "react-icons/fa"

function IncubationConfirmModal({ onConfirm, onClose, eggName }) {
	return (
		<div className="w-full h-full absolute left-0 bg-white flex flex-row justify-center items-center bg-opacity-80">
			<div className="relative w-1/3 shadow-2xl flex flex-col bg-white rounded-2xl">
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute -right-4 -top-4 bg-white rounded-full"
				>
					<FaTimesCircle
						size={40}
						className="text-Fire-Engine-Red hover:text-black"
					/>
				</button>

				{/* Header */}
				<div className="bg-Indigo-Blue py-4 px-6">
					<h2 className="text-white font-bold text-xl">Confirm</h2>
				</div>

				{/* Content */}
				<div className="flex flex-col justify-between py-10 items-center mx-6 my-6">
					<p className="text-lg mb-2">
						Do you want to incubate{" "}
						<span className="text-Flamingo-Pink font-bold">{eggName}</span>?
					</p>
					{/* <p className="text-lg mb-1">Do you want to proceed?</p> */}

					<div className="w-full flex flex-row justify-center items-center mt-12">
						<button
							onClick={onConfirm}
							className="bg-Flamingo-Pink py-2 px-8 rounded-full hover:bg-Indigo-Blue"
						>
							<span className="text-white font-bold text-xl">Confirm</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
export default IncubationConfirmModal
