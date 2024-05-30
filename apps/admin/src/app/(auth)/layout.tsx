import Image from 'next/image'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex flex-col justify-center items-center min-h-screen gap-y-8">
			<Image
				src="/logo.png"
				alt="Monster Land Logo"
				width={100}
				height={48}
			/>
			{children}
		</main>
	)
}
export default AuthLayout
