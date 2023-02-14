import NavLinkItem from "./NavLinkItem"

export default function MenuBar() {
	return (
		<section className="w-24 bg-Indigo-Blue">
			<ul className="w-24 h-full flex flex-col items-stretch">
				<li>
					<NavLinkItem path={"/trainer"} />
				</li>
				<li>
					<NavLinkItem path={"/collection"} />
				</li>
				<li>
					<NavLinkItem path={"/backpack"} />
				</li>
				<li>
					<NavLinkItem path={"/world-map"} />
				</li>
				<NavLinkItem path={"/logout"} />
			</ul>
		</section>
	)
}
