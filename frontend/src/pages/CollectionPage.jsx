import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Sidebar from "../components/sidebar/Sidebar";
import MonsterCard from "../components/monster/MonsterCard";
import { useGetMonsterCollectionQuery } from "../redux/services/collection";
import Container from "../components/Container";

export default function CollectionPage() {
	const authState = useSelector((state) => state.auth);
	const { data: monsterData, refetch: refetchCollection } = useGetMonsterCollectionQuery({
		jwt_token: authState.jwtToken,
	});
	const navigate = useNavigate();
	const [monsters, setMonsters] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		refetchCollection();
		document.title = "Monster Land - Collection";
	}, []);

	// Redirect to login if not logged in
	useEffect(() => {
		if (!authState.isLoggedIn) {
			return navigate("/login");
		}
	}, [authState.isLoggedIn]);

	// Set monsters
	useEffect(() => {
		if (monsterData) {
			setMonsters(monsterData.monster_list);
			setIsLoading(false);
		}
	}, [monsterData]);

	return (
		<Container>
			<div className="w-full flex flex-row items-stretch">
				<Sidebar />
				<div className="flex flex-col w-full">
					<Header />

					<div className="p-2 sm:p-4 md:p-8 w-full">
						{isLoading ? (
							<Loading />
						) : (
							<div className="h-full flex flex-col shadow-xl shadow-Dim-Gray rounded-sm overflow-auto bg-light-white">
								<div className="h-full p-4 md:p-10 flex md:flex-row flex-col flex-wrap md:content-start content-center gap-10 overflow-auto rounded-sm">
									{monsters?.length === 0 ? (
										<div className="h-full w-full flex flex-row justify-center items-center">
											<span className="inline-block text-Dim-Gray bg-Anti-flash-white font-bold py-2 px-10 rounded-full italic my-auto">
												You have no monster
											</span>
										</div>
									) : (
										monsters.map((monster) => (
											<MonsterCard
												key={monster.uid}
												uid={monster.uid}
												name={monster.name}
												type={monster.monster_type}
												level={monster.level}
												img_name={monster.img_name}
												attack={monster.attack}
												defense={monster.defense}
												exp={monster.exp}
												level_up_exp={monster.level_up_exp}
											/>
										))
									)}
								</div>
								{/* Quantity */}
								<div className="bg-white flex flex-row justify-center mt-auto">
									<div className="bg-Midnight-Gray inline-block rounded-full px-10 py-2 my-3">
										<span className="text-Gold-Sand font-bold">{monsters.length}</span>
										<span className="text-white"> / 50</span>
									</div>
								</div>
							</div>
						)}
					</div>

					<div className="mt-auto">
						<Footer />
					</div>
				</div>
			</div>
		</Container>
	);
}
