export default function Image({ img_name }) {
	return (
		<div className="w-52 h-52">
			<img
				className="w-full h-full"
				src={`/img/monster/${img_name}`}
				alt={img_name}
			/>
		</div>
	)
}
