import LoadingCircle from './LoadingCircle'
import LoadingDots, { LoadingDotsProps } from './LoadingDots'

interface LoadingProps {
	props?: LoadingDotsProps
	type: 'circle' | 'dots'
}

const Loading = ({ props, type }: LoadingProps) => {
	switch (type) {
		case 'dots':
			return <LoadingDots {...props} />
		case 'circle':
			return <LoadingCircle />
		default:
			return <span>Loading...</span>
	}
}

export default Loading
