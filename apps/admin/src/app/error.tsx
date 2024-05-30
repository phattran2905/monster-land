'use client' // Error components must be Client Components

import { useEffect } from 'react'

function ShieldIcon(props: { className: string }) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
		</svg>
	)
}

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	console.log(error.message)
	const errorMessage = error?.message || 'Something went wrong!'

	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-900">
			<div className="mx-auto max-w-md space-y-4 text-center">
				<div className="flex items-center justify-center">
					<ShieldIcon className="h-16 w-16 text-red-500" />
				</div>
				<h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
					{errorMessage}
				</h1>
				<p className="text-gray-600 dark:text-gray-400">
					Please contact your admin.
				</p>
			</div>
		</div>
	)
}
