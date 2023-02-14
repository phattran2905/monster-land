export default function TabLink({ isActive, title, clickHandler }) {
	return (
		<button
			onClick={clickHandler}
			className={`h-full ${
				isActive ? "bg-Flamingo-Pink" : "bg-Indigo-Blue"
			} flex flex-row justify-center items-center p-2`}
		>
			<span className="block rotate-90 text-white font-bold text-xl uppercase ">{title}</span>
		</button>
	)
}
