import Container from '@components/Container'
import Footer from '@components/Footer'

interface Props {
	children: React.ReactNode
}

const AuthPage = ({ children }: Props) => {
	return (
		<Container>
			<div className="w-full h-screen flex flex-col sm:bg-background-img-1 sm:bg-no-repeat sm:bg-cover">
				<div className="px-4 md:px-0 h-full flex flex-col justify-center items-center py-10">
					<div className="h-11/12 sm:w-5/6 md:w-3/4 w-10/12 rounded-xl shadow-lg shadow-Midnight-Gray p-6 flex flex-col justify-between items-stretch bg-white border-2 border-Indigo-Blue gap-y-8">
						{children}
					</div>
				</div>
				<Footer />
			</div>
		</Container>
	)
}
export default AuthPage
