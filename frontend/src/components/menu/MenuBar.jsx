import NavLinkItem from "./NavLinkItem"

export default function MenuBar() {
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
					<NavLinkItem path={"/team"} />
				</li>
				<li>
					<NavLinkItem path={"/map"} />
				</li>
				<li>
					<NavLinkItem path={"/incubator"} />
				</li>
				<li className="mt-auto">
					<NavLinkItem path={"/logout"} />
				</li>
			</ul>
		</section>
	)
}
