import clsx, { ClassValue } from 'clsx'

export interface LoadingDotsProps {
	color?: ClassValue
}

const LoadingDots = ({ color }: LoadingDotsProps) => {
	const baseClassNames =
		'absolute size-3 top-8 rounded-full bg-Flamingo-Pink ease-[cubic-bezier(0,1,1,0)]'

	return (
		<div className="lds-ellipsis inline-block relative size-5">
			<div
				className={clsx('animate-ellipsis-1 left-2', baseClassNames, color)}
			/>
			<div
				className={clsx('animate-ellipsis-2 left-2', baseClassNames, color)}
			/>
			<div
				className={clsx('animate-ellipsis-3 left-8', baseClassNames, color)}
			/>
			<div
				className={clsx('animate-ellipsis-4 left-14', baseClassNames, color)}
			/>
		</div>
	)
}
export default LoadingDots
