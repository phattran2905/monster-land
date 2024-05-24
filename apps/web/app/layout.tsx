import type { Metadata } from 'next'

import { Toaster } from '@components/ui/toaster'
import { Suspense } from 'react'

import { exo } from './font'
import './globals.css'
import Loading from './loading'

export const metadata: Metadata = {
	description: 'Generated by create turbo',
	title: 'Monster Land',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}): JSX.Element {
	return (
		<html lang="en">
			<body className={`${exo.className} antialiased`}>
				<Suspense fallback={<Loading />}>{children}</Suspense>
				<Toaster />
			</body>
		</html>
	)
}
