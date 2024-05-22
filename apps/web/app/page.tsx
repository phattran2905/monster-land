import background1 from '@assets/img/background/bg-1.png'
import background2 from '@assets/img/background/bg-2.png'
import background3 from '@assets/img/background/bg-3.png'
import background4 from '@assets/img/background/bg-4.png'
import Footer from '@components/Footer'
import Logo from '@components/Logo'
import { createClient } from '@utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Page() {
	const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (user) {
		const { data: profile } = await supabase
			.from('profiles')
			.select()
			.eq('uid', user.id)
			.single()

		if (profile) {
			return redirect('/dashboard')
		} else {
			return redirect('/create-character')
		}
	}

	return (
		<main className="flex flex-col h-screen">
			<div className="w-full h-full flex flex-col">
				<div className="flex flex-row h-full relative">
					<div className="absolute top-0 left-0 w-full h-full z-[-10] flex flex-row flex-nowrap overflow-hidden">
						<Image
							alt="Background 1"
							className="flex-[1_1_25%]"
							src={background1}
						/>
						<Image
							alt="Background 2"
							className="flex-[1_1_25%]"
							src={background2}
						/>
						<Image
							alt="Background 3"
							className="flex-[1_1_25%]"
							src={background3}
						/>
						<Image
							alt="Background 4"
							className="flex-[1_1_25%]"
							src={background4}
						/>
					</div>
					<div className="flex flex-col w-full h-full justify-center items-center gap-y-12 backdrop-blur-[5px]">
						<Logo className="!w-[26rem]" />

						<Link
							className="block border-8 border-y-Flamingo-Pink bg-Flamingo-Pink hover:bg-white rounded-full px-24 py-4 text-white hover:text-Flamingo-Pink font-bold text-3xl capitalize duration-500 transition-colors shadow-Midnight-Gray shadow-lg hover:shadow-2xl hover:shadow-Flamingo-Pink font-heading"
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
