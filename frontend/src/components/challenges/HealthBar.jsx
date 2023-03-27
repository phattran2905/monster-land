import { GiHealthNormal } from "react-icons/gi"
import ProgressBar from "../ProgressBar"

function HealthBar() {
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
					percentage={10}
					bgColorClass="bg-Light-Gray"
				/>
			</div>
		</div>
	)
}
export default HealthBar
