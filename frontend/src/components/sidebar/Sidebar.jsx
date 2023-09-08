import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/services/authentication";
import { getStoredJwtToken, logout } from "../../redux/slices/auth";
import logo from "../../assets/img/logo/logo-trans-bg.png";
import NavLinkItem from "./NavLinkItem";

export default function MenuBar() {
	const navigate = useNavigate();
	const [fetchLogoutApi] = useLogoutMutation();
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleLogout = async (e) => {
		e.preventDefault();
		dispatch(getStoredJwtToken());

		await fetchLogoutApi({ jwt_token: auth.jwtToken });
		dispatch(logout());
		return navigate("/login", { replace: true });
	};

	return (
		<section className="w-24 min-h-screen bg-Indigo-Blue">
			<ul className="w-24 md:h-full flex flex-col items-stretch">
				<li>
					<div className="w-24 p-1 flex justify-center items-center bg-Royal-Blue">
						<Link
							to="/home"
							className="w-full h-full p-3"
						>
							<img
								className="w-full h-full"
								src={logo}
								alt="Monster Land logo"
							/>
						</Link>
					</div>
				</li>
				<li>
					<NavLinkItem path={"/trainer"} />
				</li>
				<li>
					<NavLinkItem path={"/backpack"} />
				</li>
				<li>
					<NavLinkItem path={"/collection"} />
				</li>
				<li>
					<NavLinkItem path={"/incubation"} />
				</li>
				<li>
					<NavLinkItem path={"/challenges"} />
				</li>
				<li className="mt-auto">
					<NavLinkItem
						path={"/logout"}
						handler={handleLogout}
					/>
				</li>
			</ul>
		</section>
	);
}
