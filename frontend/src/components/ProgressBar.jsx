export default function ProgressBar({ percentage }) {
	return (
		<div class="w-full bg-Midnight-Gray rounded-full h-2.5">
			<div
				class="bg-Flamingo-Pink h-2.5 rounded-full"
				style={{
					width: `${percentage}%`,
				}}
			></div>
		</div>
	)
}
