import ProgressBar from '@components/ProgressBar'
import { GiHealthNormal } from 'react-icons/gi'

interface HealthBarProps {
	percentage: number
}
const HealthBar = ({ percentage = 100 }: HealthBarProps) => {
	return (
		<div className={`flex flex-col w-full mt-8`}>
			<div className="flex flex-row items-center">
				<GiHealthNormal
					className="text-Fire-Engine-Red"
					size={20}
				/>
				<span className="text-Fire-Engine-Red font-bold ml-2 text-xl">
					Health
				</span>
			</div>
			<div className="mt-2">
				<ProgressBar
					classNames={{
						background: 'bg-Light-Gray',
						current:
							percentage === 100 ? 'bg-Forest-Green' : 'bg-Flamingo-Pink',
					}}
					percentage={percentage}
				/>
			</div>
		</div>
	)
}
export default HealthBar
