interface Props {
	amount?: {
		capacity?: number
		current?: number
	}
}
const TabFooter = ({ amount }: Props) => {
	const { capacity, current } = amount || {}

	return (
		<div className="flex flex-row justify-center md:mt-auto mx-auto">
			<div className="bg-Midnight-Gray  inline-block rounded-full px-10 py-2 my-3">
				{current ||
					(current === 0 && (
						<span className="text-Gold-Sand font-bold">{current}</span>
					))}
				{capacity && <span className="text-white">/{capacity}</span>}
			</div>
		</div>
	)
}
export default TabFooter
