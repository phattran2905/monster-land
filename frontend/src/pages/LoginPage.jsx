import { useState } from "react"
import Footer from "../components/Footer"
import logo from "../assets/img/logo/logo-trans-bg.png"
import { FaUserAlt, FaUnlock, FaExclamationCircle, FaLock } from "react-icons/fa"

function LoginPage() {
	const [remember, setRemember] = useState(false)

	return (
		<div className="container-xl flex flex-row h-screen">
			<div className="basis-2/5 bg-white flex flex-col items-stretch justify-between">
				<div>
					<div className="w-1/4 mt-10 mb-20 mx-auto">
						<img
							className="rounded-full"
							src={logo}
							alt="Monster Land logo"
						/>
					</div>

					<div className="flex flex-col mx-auto justify-center items-center">
						<div className="w-1/2 my-4">
							<label
								htmlFor="username"
								className="flex flex-row items-center mb-2"
							>
								<FaUserAlt className="text-Royal-Blue mr-2 text-2xl" />
								<span className="text-xl text-Royal-Blue font-bold ">Username</span>
							</label>
							<input
								className="border-4 border-Indigo-Blue p-4 w-full rounded-lg focus:border-Flamingo-Pink"
								id="username"
								type="text"
								placeholder="username"
							/>
						</div>
						<div className="w-1/2 my-4">
							<label
								htmlFor="password"
								className="flex flex-row items-center mb-2"
							>
								<FaLock className="text-Royal-Blue mr-2 text-2xl" />
								<span className="text-xl text-Royal-Blue font-bold ">Password</span>
							</label>
							<input
								className="border-4 border-Indigo-Blue p-4 w-full rounded-lg focus:border-Flamingo-Pink"
								id="password"
								type="password"
								placeholder="********"
							/>
						</div>
						<div className="w-1/2 my-2 flex flex-row items-center ">
							<label
								htmlFor="remember"
								className="text-xl text-Royal-Blue font-bold pl-10 py-2 relative flex flex-row justify-center items-center align-middle group"
							>
								<span
									className={`w-6 h-6 left-0 bg-white border-4 border-Royal-Blue absolute rounded block group-hover:border-4 group-hover:border-Flamingo-Pink after:content-[''] after:absolute after:w-4 after:h-8 after:border-r-4 after:border-b-4 after:border-Flamingo-Pink after:rotate-45 after:left-1 after:-top-4 
                                    ${remember ? "after:block" : "after:hidden"}`}
								></span>
								<input
									className="w-0 h-0 opacity-0 cursor-pointer"
									id="remember"
									type="checkbox"
									checked={remember && "checked"}
									onChange={() => setRemember(!remember)}
								/>
								<span className="block">Stay logged in</span>
							</label>
						</div>
						<div className="w-1/2 my-4 bg-Fire-Engine-Red">
							<div className="flex flex-row items-center p-2">
								<FaExclamationCircle className="text-white mx-2" />
								<p className="text-white font-bold">
									Username or password is incorrect
								</p>
							</div>
						</div>
						<div className="w-1/2 my-2 flex justify-center items-center">
							<button className="py-4 px-20 rounded-full capitalize text-2xl bg-Royal-Blue text-white font-bold hover:bg-Flamingo-Pink duration-300 ">
								Log in
							</button>
						</div>
					</div>
				</div>

				<Footer />
			</div>
			<div className="basis-3/5 bg-Flamingo-Pink bg-background-img-1 bg-no-repeat bg-cover"></div>
		</div>
	)
}
export default LoginPage
