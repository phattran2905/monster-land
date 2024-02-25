import React from 'react'

type ContainerProps = {
	className?: string
	children?: React.ReactNode
}

const Container = ({ className, children }: ContainerProps) => {
	return <div className="w-full h-full">{children}</div>
}

export default Container
