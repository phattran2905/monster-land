import clsx from 'clsx'

export interface LoadingDotsProps {
	color?: string
}

const LoadingDots = ({ color = 'bg-Flamingo-Pink' }: LoadingDotsProps) => {
	const baseClassNames = `absolute w-3 h-3 top-8 rounded-full ${color} ease-[cubic-bezier(0,1,1,0)]`

	return (
		<div className="lds-ellipsis inline-block relative w-5 h-5">
			<div className={clsx(baseClassNames, 'animate-ellipsis-1 left-2')} />
			<div className={clsx(baseClassNames, 'animate-ellipsis-2 left-2')} />
			<div className={clsx(baseClassNames, 'animate-ellipsis-3 left-8')} />
			<div className={clsx(baseClassNames, 'animate-ellipsis-4 left-14')} />
		</div>
	)
}
export default LoadingDots
