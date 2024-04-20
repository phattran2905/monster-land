import background2 from '@assets/img/background/bg-2.png'
import Footer from '@components/Footer'
import Logo from '@components/Logo'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page(): Promise<JSX.Element> {
	return (
		<main className="h-screen">
			<div className="flex flex-col h-full justify-between">
				<div className="flex flex-row h-full relative">
					<div className="absolute top-0 left-0 w-full h-full z-[-10]">
						<Image
							alt="Background 2"
							fill
							src={background2}
						/>
					</div>
					<div className="flex flex-col w-full h-full justify-center items-center gap-y-12 backdrop-blur-[4px]">
						<Logo className="!w-[26rem]" />

						<Link
							className="block border-8 border-y-Flamingo-Pink bg-Flamingo-Pink hover:bg-white rounded-full px-24 py-4 text-white hover:text-Flamingo-Pink font-bold text-3xl uppercase duration-500 transition-colors shadow-Midnight-Gray shadow-lg hover:shadow-2xl hover:shadow-Flamingo-Pink font-heading"
							href="/login"
						>
							Play
						</Link>
					</div>
				</div>
				<Footer />
			</div>
		</main>
	)
}
