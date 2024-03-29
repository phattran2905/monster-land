import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight, FaAngleDoubleUp, FaStar } from "react-icons/fa";
import coinIcon from "../../assets/img/icon/coin_1_.png";
import pickaxeIcon from "../../assets/img/icon/Pickaxe.png";
import MonsterType from "../../components/monster/MonsterType";
import { useGetChallengeListQuery } from "../../redux/services/challenge";

function ChallengeStages({ onChallenge }) {
	const { data: challengeList, refetch: refetchChallenges } = useGetChallengeListQuery();
	const [stages, setStages] = useState([]);
	const [selectedStageIndex, setSelectedStageIndex] = useState(0);
	const [boss, setBoss] = useState();

	useEffect(() => {
		refetchChallenges();
	}, []);

	useEffect(() => {
		if (challengeList) {
			const challenge = challengeList[0];
			setStages(challenge.stages);
			setBoss(challenge.stages[0]);
		}
	}, [challengeList]);

	const selectStage = (actionType) => {
		if (actionType === "prev") {
			const index = selectedStageIndex - 1;
			if (index < 0) {
				setSelectedStageIndex(0);
			} else {
				setSelectedStageIndex(index);
			}
		} else {
			const index = selectedStageIndex + 1;
			if (index >= stages.length) {
				setSelectedStageIndex(stages.length - 1);
			} else {
				setSelectedStageIndex(index);
			}
		}
	};

	const renderDifficultyLevels = (levels) => {
		let levelComponent = [];
		for (let i = 0; i < levels; i++) {
			levelComponent.push(
				<li key={i}>
					<FaStar className="text-Gold-Sand" />
				</li>
			);
		}

		return levelComponent;
	};

	return (
		<>
			{/* Challenge Boss */}
			<div className="flex flex-row w-full h-full items-center justify-between">
				{/* Left Arrow */}
				<button
					onClick={() => selectStage("prev")}
					className="shadow-lg"
				>
					<FaAngleLeft
						className={`text-white ${
							selectedStageIndex <= 0
								? "bg-Dim-Gray hover:cursor-not-allowed"
								: "bg-Indigo-Blue hover:bg-Flamingo-Pink"
						} `}
						size={40}
					/>
				</button>

				{/* Stages */}
				<div className="w-full h-full m-4 bg-light-white flex flex-row items-center justify-center overflow-scroll md:overflow-auto gap-10">
					{/* Stage Card */}
					{stages.map((stage, index) => (
						<button
							key={stage.uid}
							onClick={() => {
								setSelectedStageIndex(index);
								setBoss(stage);
							}}
							className={`bg-white md:w-1/3 w-[400px] shadow-lg rounded-xl  hover:shadow-lg hover:shadow-Flamingo-Pink ${
								index === selectedStageIndex ? "shadow-Flamingo-Pink " : "shadow-Indigo-Blue "
							}`}
						>
							{/* Name */}
							<h3
								className={`rounded-tl-xl rounded-tr-xl bg-Indigo-Blue py-3 text-white font-bold text-xl border-t-4 border-l-4 border-r-4 ${
									index === selectedStageIndex ? "border-Flamingo-Pink" : "border-white"
								}`}
							>
								{stage.boss_name}
							</h3>
							{/* Boss Image */}
							<div
								className={`bg-light-white w-full h-96 p-4 border-r-4 border-l-4 ${
									index === selectedStageIndex ? "border-Flamingo-Pink" : "border-white"
								}`}
							>
								<img
									className="w-full h-full object-scale-down"
									src={`/img/challenges/${stage.boss_img_name}`}
									alt={"Boss 1"}
								/>
							</div>
							{/* Difficulty */}
							<div className="bg-Midnight-Gray flex flex-row justify-around items-center p-2">
								<span className="w-1/2 font-bold text-white">Difficulty</span>
								<ul className="w-1/2 flex flex-row justify-center items-center">
									{renderDifficultyLevels(stage?.difficulty_level)}
								</ul>
							</div>
							{/* Stats */}
							<div
								className={`flex flex-col items-center py-2 border-r-4 border-l-4 ${
									index === selectedStageIndex ? "border-Flamingo-Pink" : "border-white"
								}`}
							>
								<div className="w-2/3 flex flex-row my-2 justify-between items-center">
									<div className="flex flex-row items-center">
										<img
											src="/img/icons/stats-icons/diamond7.png"
											alt="Diamond icon"
										/>
										<span className="ml-2 capitalize">Type</span>
									</div>
									<MonsterType name={stage.boss_monster_type} />
								</div>

								<div className="w-2/3 flex flex-row my-2 justify-between items-center">
									<div className="flex flex-row items-center">
										<img
											src="/img/icons/stats-icons/sword.png"
											alt="Sword icon"
										/>
										<span className="ml-2 capitalize">Attack</span>
									</div>
									<div className="flex flex-row justify-center w-20 rounded-lg bg-Indigo-Blue shadow-sm border-2 border-Indigo-Blue">
										<span className="p-1 font-bold text-white capitalize">{stage.boss_attack}</span>
									</div>
								</div>

								<div className="w-2/3 flex flex-row my-2 justify-between items-center">
									<div className="flex flex-row items-center">
										<img
											src="/img/icons/stats-icons/shield.png"
											alt="Shield icon"
										/>
										<span className="ml-2 capitalize">Defense</span>
									</div>
									<div className="flex flex-row justify-center w-20 rounded-lg bg-Indigo-Blue shadow-sm border-2 border-Indigo-Blue">
										<span className="p-1 font-bold text-white capitalize">
											{stage.boss_defense}
										</span>
									</div>
								</div>
							</div>

							{/* Rewards */}
							<div
								className={`flex flex-col w-full border-r-4 border-l-4 ${
									index === selectedStageIndex ? "border-Flamingo-Pink" : "border-white"
								}`}
							>
								<p className="bg-Midnight-Gray text-white font-bold p-2">Rewards</p>
								{/* Reward List */}
								<div className="w-full flex flex-row ">
									{/* Drop items & eggs */}
									<div className="w-1/2 p-3 border-r-4 border-Indigo-Blue flex flex-row flex-wrap gap-3 justify-center">
										{stage.reward_eggs.map((egg) => (
											<div
												key={egg.uid}
												className="flex flex-row items-center"
											>
												<img
													className="w-5 h-5 object-scale-down"
													src={`/img/eggs/${egg.img_name}`}
													alt={egg.name}
												/>
												<span className="text-Forest-Green font-bold ml-2">x{egg.amount}</span>
											</div>
										))}
										{stage.reward_items.map((item) => (
											<div
												key={item.uid}
												className="flex flex-row items-center"
											>
												<img
													className="w-5 h-5 object-scale-down"
													src={`/img/items/${item.img_name}`}
													alt={item.name}
												/>
												<span className="text-Forest-Green font-bold ml-2">x{item.amount}</span>
											</div>
										))}
									</div>
									{/* Points */}
									<div className="w-1/2 p-4 flex flex-col gap-3 items-stretch">
										{/* Reward EXP */}
										<div className="flex flex-row items-center justify-between">
											<div className="flex flex-row items-center justify-between">
												<FaAngleDoubleUp
													className="w-5 h-5 text-Fire-Engine-Red"
													size={14}
												/>
												<span className="font-bold ml-2">EXP</span>
											</div>
											<span className="text-Forest-Green font-bold ml-2">+{stage.reward_exp}</span>
										</div>
										{/* Reward Coins */}
										<div className="flex flex-row items-center justify-between">
											<div className="flex flex-row items-center justify-between">
												<img
													className="w-5 h-5 object-scale-down"
													src={coinIcon}
													alt="Coin icon"
												/>
												<span className="font-bold ml-2">Coins</span>
											</div>
											<span className="text-Forest-Green font-bold ml-2">
												+{stage.reward_coins}
											</span>
										</div>
									</div>
								</div>
							</div>

							{/* Stamina Cost */}
							<div
								className={`bg-Indigo-Blue p-4 w-full flex flex-row justify-center items-center rounded-bl-xl rounded-br-xl border-r-4 border-l-4 border-b-4 ${
									index === selectedStageIndex ? "border-Flamingo-Pink" : "border-white"
								}`}
							>
								<img
									className="w-4 h-4 object-scale-down"
									src={pickaxeIcon}
									alt="Pickaxe icon"
								/>
								<span className="text-Light-Green px-1 font-bold text-xl">
									{stage.stamina_cost}
								</span>
							</div>
						</button>
					))}
				</div>

				{/* Right Arrow */}
				<button
					onClick={() => selectStage("next")}
					className="shadow-lg"
				>
					<FaAngleRight
						className={`text-white ${
							selectedStageIndex >= stages.length - 1
								? "bg-Dim-Gray hover:cursor-not-allowed"
								: "bg-Indigo-Blue hover:bg-Flamingo-Pink"
						} `}
						size={40}
					/>
				</button>
			</div>
			{/* Challenge Button */}
			<div className="w-full p-6 flex flex-row justify-center items-center">
				<button
					onClick={() => onChallenge(boss, challengeList.uid)}
					className="border-4 border-Flamingo-Pink bg-Flamingo-Pink px-14 py-4 rounded-full text-2xl text-white font-bold hover:bg-white hover:text-Flamingo-Pink"
				>
					Challenge
				</button>
			</div>
		</>
	);
}
export default ChallengeStages;
