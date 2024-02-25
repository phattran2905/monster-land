import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/img/logo/logo-trans-bg.png'
import { FaUserAlt, FaExclamationCircle, FaLock } from 'react-icons/fa'
import { useLoginMutation } from '../redux/services/authentication'
import { saveJwtToken, login } from '../redux/slices/auth'
import Loading from '../components/Loading'
import Layout from '@layouts'

function LoginPage() {
	const navigate = useNavigate()
	const [error, setError] = useState()
	const [username, setUsername] = useState('test')
	const [password, setPassword] = useState('123123')
	const [remember, setRemember] = useState(false)
	const [fetchLoginApi] = useLoginMutation()
	const authState = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (authState.isLoggedIn) {
			return navigate('/home')
		}
		document.title = 'Monster Land - Login'
	}, [])

	const handleLogin = async (e) => {
		e.preventDefault()
		setError()
		setIsLoading(true)

		if (!username) {
			return setError('Username is required.')
		}

		if (!password) {
			return setError('Password is required.')
		}

		if (username && password) {
			const loginResult = await fetchLoginApi({ username, password })
			// Failed to login
			if (loginResult.error) {
				setIsLoading(false)
				return setError(loginResult.error.data.message)
			}

			const jwtToken = loginResult.data.data.jwt_token

			if (remember) {
				dispatch(saveJwtToken(jwtToken))
			}

			dispatch(login(jwtToken))
			setIsLoading(false)
			return navigate('/home')
		}
	}

	return (
		<Layout type="authPage">
			{/* Logo */}
			<div className="w-1/2 sm:w-1/4 mx-auto">
				<img
					className="rounded-full"
					src={logo}
					alt="Monster Land logo"
				/>
			</div>

			{/* Form */}
			<div className="block w-10/12 sm:w-2/3 md:w-1/2 h-full mx-auto">
				<div className="flex flex-col items-center gap-y-4">
					{/* Username */}
					<div className="w-full">
						<label
							htmlFor="username"
							className="flex flex-row items-center mb-2"
						>
							<FaUserAlt className="text-Royal-Blue mr-2 text-2xl" />
							<span className="text-xl text-Royal-Blue font-bold ">
								Username
							</span>
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
					{/* Password */}
					<div className="w-full">
						<label
							htmlFor="password"
							className="flex flex-row items-center mb-2"
						>
							<FaLock className="text-Royal-Blue mr-2 text-2xl" />
							<span className="text-xl text-Royal-Blue font-bold ">
								Password
							</span>
						</label>
						<input
							className="border-4 border-Indigo-Blue p-4 w-full rounded-lg focus:border-Flamingo-Pink"
							id="password"
							type="password"
							placeholder="********"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required={true}
						/>
					</div>
					{/* Stay Logged In */}
					<div className="w-full my-2 flex flex-row items-center">
						<label
							htmlFor="remember"
							className="text-xl text-Royal-Blue font-bold pl-10 py-2 relative flex flex-row justify-center items-center align-middle group"
						>
							<span
								className={`w-6 h-6 left-0 bg-white border-4 border-Royal-Blue absolute rounded block group-hover:border-4 group-hover:border-Flamingo-Pink after:content-[''] after:absolute after:w-4 after:h-8 after:border-r-4 after:border-b-4 after:border-Flamingo-Pink after:rotate-45 after:left-1 after:-top-4 
                                    ${
																			remember ? 'after:block' : 'after:hidden'
																		}`}
							></span>
							<input
								className="w-0 h-0 opacity-0 cursor-pointer"
								id="remember"
								type="checkbox"
								checked={remember && 'checked'}
								onChange={() => setRemember(!remember)}
								required={true}
							/>
							<span className="block">Stay logged in</span>
						</label>
					</div>
					{/* Error */}
					{error && (
						<div className="w-full my-4 bg-Fire-Engine-Red">
							<div className="flex flex-row items-center p-2">
								<FaExclamationCircle className="text-white mx-2" />
								<p className="text-white font-bold capitalize">{error}</p>
							</div>
						</div>
					)}

					{/* Loading & Submit  */}
					{isLoading ? (
						<Loading />
					) : (
						<div className="w-full flex justify-center items-center">
							<button
								onClick={handleLogin}
								className="py-3 px-16 rounded-full capitalize text-2xl bg-Royal-Blue text-white font-bold hover:bg-Flamingo-Pink duration-300"
							>
								Log in
							</button>
						</div>
					)}

					{/* Link to register */}
					<div className="w-full flex justify-center items-center">
						<p className="p-1">
							Don't have an account?
							<Link
								to="/sign-up"
								className="mx-2 underline font-bold text-Flamingo-Pink"
							>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</Layout>
	)
}
export default LoginPage
