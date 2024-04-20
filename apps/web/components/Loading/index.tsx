import { ClassValue } from 'clsx'

import LoadingCircle from './LoadingCircle'
import LoadingDots from './LoadingDots'

interface LoadingProps {
	color?: ClassValue
	type: 'circle' | 'dots'
}

const Loading = ({ color, type }: LoadingProps) => {
	switch (type) {
		case 'dots':
			return <LoadingDots color={color} />
		case 'circle':
			return <LoadingCircle />
		default:
			return <span>Loading...</span>
	}
}

export default Loading
