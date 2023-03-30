import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import logo from "../assets/img/logo/logo-trans-bg.png"
import { FaUserAlt, FaExclamationCircle, FaLock } from "react-icons/fa"
import { useSignUpMutation } from "../redux/services/authentication"
import { getStoredJwtToken } from "../redux/slices/auth"

function SignUpPage() {
	const navigate = useNavigate()
	const [error, setError] = useState()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [confirm, setConfirm] = useState("")
	const [fetchLoginApi, { isLoading, isError, isSuccess }] = useSignUpMutation()

	const auth = useSelector((state) => state.auth)
	const dispatch = useDispatch()

	useEffect(() => {
		document.title = "Monster Land - Sign Up"
	}, [])

	useEffect(() => {
		dispatch(getStoredJwtToken())
		if (auth.isLoggedIn) {
			return navigate("/home")
		}
	}, [auth.isLoggedIn])

	const handleSignUp = async (e) => {
		e.preventDefault()
		setError()

		if (username && password) {
			const signUpResult = await fetchLoginApi({ username, password, confirm })

			if (signUpResult.error) {
				return setError(signUpResult.error.data.message)
			}

			return navigate("/login")
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
							/>
						</div>
						<div className="w-full my-4">
							<label
								htmlFor="password"
								className="flex flex-row items-center mb-2"
							>
								<FaLock className="text-Royal-Blue mr-2 text-2xl" />
								<span className="text-xl text-Royal-Blue font-bold ">
									New Password
								</span>
							</label>
							<input
								className="border-4 border-Indigo-Blue p-4 w-full rounded-lg focus:border-Flamingo-Pink"
								id="password"
								type="password"
								placeholder="********"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="w-full my-4">
							<label
								htmlFor="confirm-password"
								className="flex flex-row items-center mb-2"
							>
								<FaLock className="text-Royal-Blue mr-2 text-2xl" />
								<span className="text-xl text-Royal-Blue font-bold ">Confirm</span>
							</label>
							<input
								className="border-4 border-Indigo-Blue p-4 w-full rounded-lg focus:border-Flamingo-Pink"
								id="confirm-password"
								type="password"
								placeholder="********"
								value={confirm}
								onChange={(e) => setConfirm(e.target.value)}
							/>
						</div>
						{error && (
							<div className="w-full my-4 bg-Fire-Engine-Red">
								<div className="flex flex-row items-center p-2">
									<FaExclamationCircle className="text-white mx-2" />
									<p className="text-white font-bold">
										{error}
									</p>
								</div>
							</div>
						)}
						<div className="w-full my-12 flex justify-center items-center">
							<button
								onClick={handleSignUp}
								className="py-4 px-20 rounded-full capitalize text-2xl bg-Royal-Blue text-white font-bold hover:bg-Flamingo-Pink duration-300 "
							>
								Sign Up
							</button>
						</div>
						<div className="w-full my-12 flex justify-center items-center">
							<p>
								Already have an account?
								<Link to="/login" className="mx-2 underline font-bold text-Flamingo-Pink">Log in</Link>
							</p>
						</div>
					</div>
				</div>

				<Footer />
			</div>
			<div className="basis-3/5 bg-Flamingo-Pink bg-background-img-1 bg-no-repeat bg-cover"></div>
		</div>
	)
}
export default SignUpPage
