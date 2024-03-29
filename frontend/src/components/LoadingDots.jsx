import { useState } from "react"

/** 
 * I have implemented a Pure CSS Loaders solution that I found here:
 * https://loading.io/css/
 * */ 
function LoadingDots({ color = "bg-Flamingo-Pink" }) {
	return (
		<div className="lds-ellipsis inline-block relative w-5 h-5">
			<div
				className={`absolute w-3 h-3 top-8 rounded-full ${color} ease-[cubic-bezier(0,1,1,0)] animate-ellipsis-1 left-2`}
			></div>
			<div
				className={`absolute w-3 h-3 top-8 rounded-full ${color} ease-[cubic-bezier(0,1,1,0)] animate-ellipsis-2 left-2`}
			></div>
			<div
				className={`absolute w-3 h-3 top-8 rounded-full ${color} ease-[cubic-bezier(0,1,1,0)] animate-ellipsis-3 left-8`}
			></div>
			<div
				className={`absolute w-3 h-3 top-8 rounded-full ${color} ease-[cubic-bezier(0,1,1,0)] animate-ellipsis-4 left-14`}
			></div>
		</div>
	)
}
export default LoadingDots
