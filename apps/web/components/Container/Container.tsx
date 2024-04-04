import React from 'react'
import clsx from 'clsx'
import type { ClassValue } from 'clsx'

interface ContainerProps {
	className?: ClassValue
	children?: React.ReactNode
}

const Container = ({ className, children }: ContainerProps) => {
	return <div className={clsx('w-full h-full', className)}>{children}</div>
}

export default Container
