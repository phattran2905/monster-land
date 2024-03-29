import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import logo from "../assets/img/logo/logo-trans-bg.png";
import { FaUserAlt, FaExclamationCircle, FaLock } from "react-icons/fa";
import { useSignUpMutation } from "../redux/services/authentication";
import { getStoredJwtToken } from "../redux/slices/auth";
import Container from "../components/Container";

function SignUpPage() {
	const navigate = useNavigate();
	const [error, setError] = useState();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [fetchLoginApi] = useSignUpMutation();

	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		document.title = "Monster Land - Sign Up";
	}, []);

	useEffect(() => {
		dispatch(getStoredJwtToken());
		if (auth.isLoggedIn) {
			return navigate("/home");
		}
	}, [auth.isLoggedIn]);

	const handleSignUp = async (e) => {
		e.preventDefault();
		setError();

		if (username && password) {
			const signUpResult = await fetchLoginApi({ username, password, confirm });

			if (signUpResult.error) {
				return setError(signUpResult.error.data.message);
			}

			// return navigate("/login")
		}
	};

	return (
		<Container>
			<div className="w-full h-screen flex flex-col sm:bg-background-img-1 sm:bg-no-repeat sm:bg-cover">
				<div className="px-4 md:px-0 h-full flex flex-col justify-center items-center py-10">
					<div className="h-11/12 sm:w-5/6 md:w-3/4 w-10/12 rounded-xl shadow-lg shadow-Midnight-Gray p-6 flex flex-col justify-between items-stretch bg-white border-2 border-Indigo-Blue gap-y-8">
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
								<div className="w-full ">
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
								{/* New Password */}
								<div className="w-full ">
									<label
										htmlFor="password"
										className="flex flex-row items-center mb-2"
									>
										<FaLock className="text-Royal-Blue mr-2 text-2xl" />
										<span className="text-xl text-Royal-Blue font-bold ">New Password</span>
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
								{/* Confirm Password */}
								<div className="w-full ">
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
								{/* Error */}
								{error && (
									<div className="w-full my-4 bg-Fire-Engine-Red">
										<div className="flex flex-row items-center p-2">
											<FaExclamationCircle className="text-white mx-2" />
											<p className="text-white font-bold">{error}</p>
										</div>
									</div>
								)}
								{/* Button */}
								<div className="w-full flex justify-center items-center">
									<button
										onClick={handleSignUp}
										className="py-3 px-16 rounded-full capitalize text-2xl bg-Royal-Blue text-white font-bold hover:bg-Flamingo-Pink duration-300"
									>
										Sign Up
									</button>
								</div>
								{/* Link to Login */}
								<div className="w-full flex justify-center items-center">
									<p>
										Already have an account?
										<Link
											to="/login"
											className="mx-2 underline font-bold text-Flamingo-Pink"
										>
											Log in
										</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</Container>
	);
}
export default SignUpPage;
