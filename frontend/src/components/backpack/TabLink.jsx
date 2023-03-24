import { FaEgg } from "react-icons/fa"
import { RiTempColdFill } from "react-icons/ri"

export default function TabLink({ isActive, title, clickHandler, icon }) {
	return (
		<button
			onClick={clickHandler}
			className={`h-full ${
				isActive ? "bg-Flamingo-Pink" : "bg-Indigo-Blue"
			} flex flex-row justify-center items-center px-20 py-4`}
		>
			{title === "Eggs" && (
				<FaEgg
					size={16}
					color="white"
				/>
			)}
			{title === "Items" && (
				<RiTempColdFill
					size={18}
					color="white"
				/>
			)}
			<span className="ml-1 text-white font-bold text-xl capitalize">{title}</span>
		</button>
	)
}
