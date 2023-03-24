export default function ProgressBar({
	percentage,
	bgColorClass = "bg-Midnight-Gray",
	currentBgColorClass = "bg-Flamingo-Pink",
	height = "h-3",
}) {
	return (
		<div className={`w-full ${bgColorClass} rounded-full ${height} border-2 border-Dim-Gray`}>
			<div
				className={`${currentBgColorClass} ${height} rounded-full`}
				style={{
					width: `${percentage}%`,
				}}
			></div>
		</div>
	)
}
