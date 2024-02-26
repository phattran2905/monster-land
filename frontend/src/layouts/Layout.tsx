import React from 'react'
import Page from './Page'
import AuthPage from '@layouts/AuthPage'
import ErrorPage from '@layouts/ErrorPage'

interface LayoutProps {
	type: 'authPage' | 'errorPage' | 'page'
	children: React.ReactNode
}

const Layout = ({ type, ...props }: LayoutProps) => {
	switch (type) {
		case 'authPage':
			return <AuthPage {...props} />
		case 'errorPage':
			return <ErrorPage {...props} />
		default:
			return <Page {...props} />
	}
}
export default Layout
