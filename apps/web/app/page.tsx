import Image from 'next/image'
import { Card } from '@repo/ui/card'
import { Code } from '@repo/ui/code'
import { Button } from '@repo/ui/button'
import logo from '@assets/img/logo/logo-trans-bg.png'
import Container from '@components/Container'
import Link from 'next/link'
import Footer from '@components/Footer'

export default function Page(): JSX.Element {
	return (
		<Container>
			{/* Background Image */}
			<div className="w-full h-screen flex flex-col justify-between bg-background-img-2 bg-no-repeat bg-cover">
				{/* Blue Background */}
				<div className="w-full h-full flex flex-row justify-center items-center backdrop-blur-[6px]">
					{/* Logo & Play */}
					<div className="w-full h-full flex flex-col justify-center items-center py-14">
						<div className="w-[26em] px-8 mb-16 rounded-full">
							<Image
								alt="Monster Land logo"
								src={logo}
								className="w-full h-full mx-auto"
							/>
						</div>

						<div className="flex flex-row justify-center">
							<Link
								href="/login"
								className="border-8 border-y-Flamingo-Pink bg-Flamingo-Pink hover:bg-white rounded-full px-24 py-4 text-white hover:text-Flamingo-Pink font-bold text-3xl uppercase duration-500 transition-colors shadow-Midnight-Gray shadow-lg hover:shadow-2xl hover:shadow-Flamingo-Pink font-heading"
							>
								Play
							</Link>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</Container>
	)
}
