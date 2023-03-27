import { GiHealthNormal } from "react-icons/gi"
import ProgressBar from "../ProgressBar"

function HealthBar({ percentage = 100 }) {
	return (
		<div className={`flex flex-col w-full mt-8`}>
			<div className="flex flex-row items-center">
				<GiHealthNormal
					size={20}
					className="text-Fire-Engine-Red"
				/>
				<span className="text-Fire-Engine-Red font-bold ml-2 text-xl">Health</span>
			</div>
			<div className="mt-2">
				<ProgressBar
					percentage={percentage}
					bgColorClass="bg-Light-Gray"
					currentBgColorClass={
						percentage === 100 ? "bg-Forest-Green" : "bg-Flamingo-Pink"
					}
				/>
			</div>
		</div>
	)
}
export default HealthBar
