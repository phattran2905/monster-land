import { FaAngleDoubleUp, FaCheckCircle, FaClock } from "react-icons/fa"
import { AiOutlineNumber } from "react-icons/ai"
import moment from "moment"
import { useState, useEffect } from "react"
import MonsterType from "../monster/MonsterType"
import LoadingDots from "../LoadingDots"
import ProgressBar from "../ProgressBar"

function IncubatorCard({
	index,
	name,
	incubator,
	onShowBoostModal,
	onShowSelectEggModal,
	onDoneIncubating,
}) {
	const [inUse, setInUse] = useState(false)
	const [done, setDone] = useState(false)
	const [secondsToCount, setSecondsToCount] = useState(1)
	const [counter, setCounter] = useState(0)
	const [hatchingTime, setHatchingTime] = useState("00:00:00")

	useEffect(() => {
		const intervalIndex = setInterval(() => {
			if (counter >= 0) {
				setCounter((counter) => counter - 1)
			}
		}, 1000)

		return () => clearInterval(intervalIndex)
	}, [])

	const displayHatchingTime = (hatching_time_in_seconds) => {
		const duration = moment.duration(hatching_time_in_seconds, "seconds")
		const hours = Math.floor(duration.asHours())
		const minutes = duration.minutes()
		const seconds = duration.seconds()
		return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`
	}

	useEffect(() => {
		if (incubator) {
			setInUse(true)
			const now = moment()
			const doneHatchingTime = moment(incubator?.done_hatching_time)
			const diffTime = doneHatchingTime.diff(now, "seconds")

			if (diffTime > 0) {
				setSecondsToCount(diffTime)
				setCounter(diffTime)
				setHatchingTime(displayHatchingTime(counter))
				setDone(false)
			} else {
				setSecondsToCount(1)
				setCounter(0)
				setHatchingTime("00:00:00")
				setDone(true)
			}
		}
	}, [incubator])

	useEffect(() => {
		if (counter <= 0) {
			setDone(true)
		} else {
			setHatchingTime(displayHatchingTime(counter))
			setDone(false)
		}
	}, [counter])

	return (
		<div
			className={`${
				inUse && !done ? "border-Light-Gray bg-light-white" : "border-Indigo-Blue"
			} ${inUse && done && "border-Forest-Green bg-Light-Green"}
            flex flex-col items-center w-1/2 h-3/4 py-10 border-4  rounded-lg shadow-2xl`}
		>
			{/* Name */}
			<div className=" bg-Indigo-Blue py-4 w-1/2 flex flex-row justify-center rounded-xl">
				<span className="text-white capitalize font-bold text-2xl">{name}</span>
			</div>

			{/* Incubator Image & Egg */}
			<div className="w-full h-full p-8 flex flex-col justify-between items-center">
				<div className="w-full my-6 flex flex-row justify-around items-center">
					<div
						style={{ width: "30rem" }}
						className="h-full flex flex-row justify-center items-center relative bg-background-incubator-img g-no-repeat bg-cover"
					>
						{inUse ? (
							<img
								style={{ height: "32rem" }}
								className="object-fit"
								src="/img/incubators/inferno-egg-incubator.png"
								alt={name}
							/>
						) : (
							<img
								style={{ height: "32rem" }}
								className="object-fit"
								src="/img/incubators/incubator.png"
								alt={name}
							/>
						)}
					</div>
					{/* Egg Info */}
					{inUse && (
						<>
							<div
								style={{
									width: 0,
									height: 0,
									borderTop: "1rem solid transparent",
									borderBottom: "1rem solid transparent",
									borderRight: "1rem solid #393E7D",
								}}
							></div>

							<div className="w-60 mr-6 py-4 px-6 border-2 border-Indigo-Blue flex flex-col justify-center items-stretch rounded-2xl shadow-xl">
								<div className="mb-3">
									<div className="mb-1 flex flex-row items-center">
										<span className="mr-1 text-Fire-Engine-Red font-bold">
											<AiOutlineNumber className="font-bold" />
										</span>
										<span className="font-bold text-Indigo-Blue underline">
											UID
										</span>
									</div>
									<div className="py-2 bg-Midnight-Gray flex flex-row justify-center items-center">
										<span className="text-white px-4">{incubator?.uid}</span>
									</div>
								</div>
								<div className="mb-3">
									<div className="mb-1 flex flex-row items-center">
										<img
											className="text-Fire-Engine-Red mr-1"
											src="/img/icons/stats-icons/diamond7.png"
											alt="Diamond icon"
										/>
										<span className="font-bold text-Indigo-Blue underline">
											Monster Type
										</span>
									</div>
									<div className="ml-4 py-1">
										<MonsterType name={incubator?.monster_type} />
									</div>
								</div>
								<div className="mb-3">
									<div className="mb-1 flex flex-row items-center">
										<FaClock
											className="text-Fire-Engine-Red mr-1"
											size={16}
										/>
										<span className="font-bold text-Indigo-Blue underline">
											Hatching Time
										</span>
									</div>
									<div className="ml-1 py-1">
										<div className="w-full flex flex-row items-center">
											{/* Progress bar */}
											<ProgressBar
												percentage={
													done
														? 100
														: ((secondsToCount - counter) / 60) * 100
												}
												bgColorClass="bg-Light-Gray"
												currentBgColorClass={
													done ? "bg-Forest-Green" : "bg-Flamingo-Pink"
												}
											/>
											{/* Done icon && Boost button */}
											{done ? (
												<FaCheckCircle
													className="ml-2 text-Forest-Green"
													size={22}
												/>
											) : (
												<>
													{/* <button
													onClick={onShowBoostModal}
													className="ml-2 p-1 bg-Forest-Green rounded-full hover:bg-Flamingo-Pink"
												>
													<FaAngleDoubleUp
														className="text-white rotate-90 "
														size={16}
													/>
												</button> */}
												</>
											)}
										</div>
										{/* Time */}
										{inUse && !done && (
											<div className="flex flex-row justify-center my-2">
												<span className="py-2 px-4 font-bold rounded-lg bg-Flamingo-Pink text-white">
													{hatchingTime}
												</span>
											</div>
										)}
									</div>
								</div>

								{/* Hatch button */}
								{done && (
									<button
										onClick={() => {
											onDoneIncubating(incubator?.uid, index)
                                            setInUse(false)
										}}
										className="mt- py-2 px-10 rounded-full bg-Flamingo-Pink text-white hover:bg-Forest-Green font-bold capitalize"
									>
										Hatch now
									</button>
								)}
							</div>
						</>
					)}
				</div>

				{/* Loading dots and Choose Button */}
				<div className="w-full my-4 flex flex-row justify-center items-center">
					{inUse && !done && (
						<div className="py-4 px-14 flex flex-row">
							<LoadingDots />
						</div>
					)}
					{!inUse && (
						<button
							onClick={onShowSelectEggModal}
							className="bg-Flamingo-Pink py-4 px-14 rounded-full hover:bg-Indigo-Blue"
						>
							<span className="font-bold text-lg capitalize text-white">
								Choose an egg
							</span>
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default IncubatorCard
