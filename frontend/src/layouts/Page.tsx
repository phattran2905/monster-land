import React from 'react'

interface PageProps {
	children: React.ReactNode
}

const Page = ({ ...props }: PageProps) => {
	return <div>Page</div>
}

export default Page
