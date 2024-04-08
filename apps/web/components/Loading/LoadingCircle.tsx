const LoadingCircle = () => {
	return (
		<div className="w-full h-full flex flex-row justify-center items-center">
			<div className="lds-ripple inline-block relative size-20">
				<div className="absolute rounded-full border-4 border-Flamingo-Pink animate-ripple-1" />
				<div className="absolute rounded-full border-4 border-Flamingo-Pink  animate-ripple-2" />
			</div>
		</div>
	)
}
export default LoadingCircle
