import LoadingCircle from './LoadingCircle'
import LoadingDots, { LoadingDotsProps } from './LoadingDots'

interface Props extends LoadingDotsProps {
	type?: 'circle' | 'dots' | undefined
}

const Loading = ({ type, ...props }: Props) => {
	switch (type) {
		case 'dots':
			return <LoadingDots {...props} />
		case 'circle':
		default:
			return <LoadingCircle />
	}
}

export default Loading
