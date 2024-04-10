import clsx from 'clsx'
import { ClassValue } from 'clsx'

interface Props {
	classNames?: {
		background: ClassValue
		current: ClassValue
	}
	percentage?: number
}

const ProgressBar = ({
	classNames = {
		background: 'bg-Midnight-Gray',
		current: 'bg-Flamingo-Pink',
	},
	percentage = 0,
}: Props) => {
	return (
		<div className={clsx('w-full rounded-full h-3', classNames.background)}>
			<div
				className={clsx('h-3 rounded-full', classNames.current)}
				style={{
					width: percentage > 0 ? `${percentage}%` : '0%',
				}}
			/>
		</div>
	)
}
export default ProgressBar
