import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import logo from "../assets/img/logo/logo-trans-bg.png"
import { FaUserAlt, FaExclamationCircle, FaLock } from "react-icons/fa"
import { useLoginMutation } from "../redux/services/authentication"
import { saveJwtToken, getStoredJwtToken, login } from "../redux/slices/auth"

function LoginPage() {
	const navigate = useNavigate()
	const [error, setError] = useState()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [remember, setRemember] = useState(false)
	const [fetchLoginApi] = useLoginMutation()
	const auth = useSelector((state) => state.auth)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getStoredJwtToken())
		if (auth.isLoggedIn) {
			return navigate("/home")
		}
	}, [auth.isLoggedIn])

	const handleLogin = async (e) => {
		e.preventDefault()
		setError()

		if (username && password) {
			const loginResult = await fetchLoginApi({ username, password })

			if (loginResult.error) {
				return setError(loginResult.error.data.message)
			}
			// Store jwt_token
			const jwtToken = loginResult.data.data.jwt_token

			if (remember) {
				dispatch(saveJwtToken(jwtToken))
			}

			dispatch(login(jwtToken))
			return navigate("/home")
		}
	}

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

					<div className="px-36 flex flex-col mx-auto justify-center items-center">
						<div className="w-full my-4">
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
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>
						<div className="w-full my-4">
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
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className="w-full my-2 flex flex-row items-center ">
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
						{error && (
							<div className="w-full my-4 bg-Fire-Engine-Red">
								<div className="flex flex-row items-center p-2">
									<FaExclamationCircle className="text-white mx-2" />
									<p className="text-white font-bold capitalize">{error}</p>
								</div>
							</div>
						)}
						<div className="w-full my-12 flex justify-center items-center">
							<button
								onClick={handleLogin}
								className="py-4 px-20 rounded-full capitalize text-2xl bg-Royal-Blue text-white font-bold hover:bg-Flamingo-Pink duration-300 "
							>
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
