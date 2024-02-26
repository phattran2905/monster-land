import clsx from 'clsx'
import { ClassValue } from 'clsx'

interface Props {
	percentage?: number
	classNames?: {
		background: ClassValue
		current: ClassValue
	}
}

const ProgressBar = ({
	percentage = 0,
	classNames = {
		background: 'bg-Midnight-Gray',
		current: 'bg-Flamingo-Pink',
	},
}: Props) => {
	return (
		<div className={clsx('w-full rounded-full h-3', classNames.background)}>
			<div
				className={clsx('h-3 rounded-full', classNames.current)}
				style={{
					width: `${percentage}%`,
				}}
			/>
		</div>
	)
}
export default ProgressBar
