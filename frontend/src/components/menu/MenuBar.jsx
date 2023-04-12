import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../../redux/services/authentication"
import { getStoredJwtToken, logout } from "../../redux/slices/auth"
import NavLinkItem from "./NavLinkItem"

export default function MenuBar() {
	const navigate = useNavigate()
	const [fetchLogoutApi] = useLogoutMutation()
	const auth = useSelector((state) => state.auth)
	const dispatch = useDispatch()

	const handleLogout = async (e) => {
		e.preventDefault()
		dispatch(getStoredJwtToken())

		const result = await fetchLogoutApi({ jwt_token: auth.jwtToken })
		dispatch(logout())
		return navigate("/login", { replace: true })
	}

	return (
		<section className="w-24 bg-Indigo-Blue">
			<ul className="w-24 h-full flex flex-col items-stretch">
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
				{/* <li>
					<NavLinkItem path={"/team"} />
				</li> */}
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
	)
}
