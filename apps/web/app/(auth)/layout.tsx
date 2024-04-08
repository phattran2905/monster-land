import background1 from '@assets/img/background/bg-1.png'
import Footer from '@components/Footer'
import Image from 'next/image'
import { ComponentProps } from 'react'

interface LayoutProps extends ComponentProps<'main'> {}

const Layout = ({ children }: LayoutProps) => {
	return (
		<main className="flex flex-row items-stretch justify-start h-screen">
			<div className="relative basis-1/2">
				<Image
					alt="background1"
					fill
					src={background1}
				/>
			</div>
			<div className="basis-1/2 flex flex-col justify-between">
				<div className="px-4 md:px-0 h-full flex flex-col justify-center items-center py-10 bg-Light-Indigo-Blue/30">
					<div className="sm:w-5/6 md:w-3/4 w-10/12 rounded-xl shadow-lg p-6 flex flex-col gap-y-8 bg-white">
						{children}
					</div>
				</div>
				<Footer />
			</div>
		</main>
	)
}
export default Layout
