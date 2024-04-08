import transparentLogo from '@assets/img/logo/logo-trans-bg.png'
import whiteBgLogo from '@assets/img/logo/logo-white-bg.png'
import clsx from 'clsx'
import { ClassValue } from 'clsx'
import Image from 'next/image'

interface LogoProps {
	className?: ClassValue
	fill?: boolean
	transparent?: boolean
}

const Logo = ({ className, fill = false, transparent = true }: LogoProps) => {
	return (
		<div className={clsx('w-1/2 sm:w-1/4', className)}>
			<Image
				alt="Monster Land logo"
				className="rounded-full"
				fill={fill}
				src={transparent ? transparentLogo : whiteBgLogo}
			/>
		</div>
	)
}
export default Logo
