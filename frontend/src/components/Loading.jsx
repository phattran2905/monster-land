/**
 * I have implemented a Pure CSS Loaders solution that I found here:
 * https://loading.io/css/
 * */
export default function Loading() {
	return (
		<div className="w-full h-full flex flex-row justify-center items-center">
			<div className="lds-ripple inline-block relative w-20 h-20">
				<div className="absolute opacity-100 rounded-full border-4 border-Flamingo-Pink animate-ripple-1"></div>
				<div className="absolute opacity-100 rounded-full border-4 border-Flamingo-Pink  animate-ripple-2"></div>
			</div>
		</div>
	)
}
