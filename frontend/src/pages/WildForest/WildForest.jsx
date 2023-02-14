import { useEffect, useState } from "react"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import MenuBar from "../../components/menu/MenuBar"
import PokemonType from "../../components/pokemon/Type"
import PokemonImg from "../../components/pokemon/Image"
import Item from "../../components/Item"
import Loading from "../../components/Loading"
import SucceededResult from "../../components/capture/SucceededResult"
import FailedResult from "../../components/capture/FailedResult"
import PokeballImg from "../../assets/img/Pokeball.png"
import {
	useCaptureWildPokemonMutation,
	useFindWildPokemonMutation,
} from "../../redux/services/pokemon"
import { useGetBackpackQuery, useUseItemsMutation } from "../../redux/services/backpack"

export default function WildForest() {
	const [findWildPokemon, { isLoading: findLoading }] = useFindWildPokemonMutation()
	const [captureWildPokemon, { isLoading: captureLoading }] = useCaptureWildPokemonMutation()
	const [useItems, { isLoading: useLoading }] = useUseItemsMutation()
    const { data: backpack, refetch } = useGetBackpackQuery()
	const [wildPokemon, setWildPokemon] = useState()
	const [itemToUseList, setItemToUseList] = useState([])
	const [captureResult, setCaptureResult] = useState()

	useEffect(() => {
		findWildPokemon()
			.unwrap()
			.then((data) => setWildPokemon(data))
			.catch((e) => console.log(e))
	}, [])

	const updateItemToUseList = (itemToUse) => {
		const existent = itemToUseList.find((i) => i.item_uid === itemToUse.item_uid)
		if (!existent) {
			setItemToUseList([
				...itemToUseList,
				{ item_uid: itemToUse.item_uid, amount: itemToUse.amount },
			])
		} else {
			let updatedList = itemToUseList
			// Remove item
			if (itemToUse.amount <= 0) {
				updatedList = itemToUseList.filter((i) => i.item_uid !== itemToUse.item_uid)
			} else {
				updatedList = itemToUseList.map((i) => {
					if (i.item_uid === itemToUse.item_uid) {
						i.amount = itemToUse.amount
					}

					return i
				})
			}
			setItemToUseList(updatedList)
		}
	}

	const onUseItems = () => {
		if (itemToUseList.length > 0) {
			useItems({ backpackUID: backpack.uid, wildPokemonUID: wildPokemon.uid, itemToUseList })
				.unwrap()
				.then((data) => {
					setWildPokemon({ ...wildPokemon, capture_rate: data.capture_rate })
					setItemToUseList([])
                    refetch()
				})
				.catch((e) => e)
		}
	}

	const onSkip = () => {
		findWildPokemon()
			.unwrap()
			.then((r) => {
				setWildPokemon(r)
                setCaptureResult(undefined)
			})
			.catch((e) => e)
	}

	const onCapture = () => {
		captureWildPokemon(wildPokemon.uid)
			.unwrap()
			.then((data) => {
				setCaptureResult(data)
			})
			.catch((e) => e)
	}

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row">
				<MenuBar />

				{captureResult ? (
					<>
						{captureResult.message.toLowerCase() === "succeeded" ? (
							<SucceededResult
								img_name={wildPokemon.img_name}
								name={wildPokemon.name}
								level={wildPokemon.level}
								type={wildPokemon.type}
								onSkip={onSkip}
							/>
						) : (
							<FailedResult />
						)}
					</>
				) : (
					<div className="w-full h-full bg-background-img-5 bg-no-repeat bg-cover flex flex-row justify-between items-stretch gap-10 p-10">
						<div className=" bg-white rounded-xl w-2/6 flex flex-col justify-between">
							{useLoading ? (
								<Loading />
							) : (
								<>
									{/* Items */}
									<div className="m-6 px-6 overflow-y-auto">
										{backpack &&
											backpack?.item_list?.map((item) => (
												<div
													key={item.uid}
													className={`w-full h-24 my-4 ${
														itemToUseList.find(
															(i) => i.item_uid === item.uid
														)
															? "border-4 border-Flamingo-Pink"
															: "border-2 border-Indigo-Blue"
													} rounded-xl flex flex-row justify-around items-center`}
												>
													<Item
														uid={item.uid}
														name={item.name}
														img_name={item.img_name}
														effect_property={item.effect_property}
														effect_value={item.effect_value}
														amount={item.amount}
														isInput={true}
														onInputChange={updateItemToUseList}
													/>
												</div>
											))}
									</div>
								</>
							)}

							{/* Button */}
							<div className="flex flex-row justify-end p-4 shadow-xl bg-white w-full border-t-4 border-Midnight-Gray">
								<button
									onClick={onUseItems}
									disabled={itemToUseList.length === 0}
									className={`py-2 px-14 ml-4  text-white font-bold text-xl rounded-full border-2 ${
										itemToUseList.length > 0
											? "border-Flamingo-Pink bg-Flamingo-Pink hover:bg-white hover:text-Indigo-Blue hover:border-2 hover:border-Indigo-Blue "
											: "bg-Normal border-Normal cursor-not-allowed"
									} transition-colors duration-200`}
								>
									Use
								</button>
							</div>
						</div>

						{/* Capture button */}
						<div className="flex flex-row justify-end items-end py-6">
							<button
								onClick={onCapture}
								className="opacity-80 px-10 py-6 rounded-full bg-white text-Flamingo-Pink font-bold uppercase text-xl hover:bg-Flamingo-Pink hover:text-white transition-colors duration-200 hover:shadow-lg hover:shadow-Gold-Sand hover:opacity-100"
							>
								<img
									className="w-28 h-28 m-2"
									src={PokeballImg}
									alt="Pokeball"
								/>
								Capture
							</button>
						</div>

						{/* Wild Pokemon */}
						<div className="w-2/6 flex flex-col items-center justify-evenly">
							{findLoading || captureLoading ? (
								<Loading />
							) : (
								<>
									<div className="w-96 bg-white rounded-lg border-2 border-Indigo-Blue px-4 py-6">
										<div className="mx-1 mb-4">
											<span className="text-Indigo-Blue font-bold text-lg mr-6 underline capitalize">
												Level
											</span>
											<span className="font-bold text-Flamingo-Pink text-xl">
												{wildPokemon?.level}
											</span>
										</div>
										<div className="mx-1 mb-4">
											<span className="text-Indigo-Blue font-bold text-lg mr-6 underline capitalize">
												Type
											</span>
											{wildPokemon?.type.map((type) => (
												<div
													key={type}
													className="inline-block"
												>
													<PokemonType name={type} />
												</div>
											))}
										</div>
										<div className="mx-1 mb-2">
											<div className="mb-4 flex flex-row justify-between items-center">
												<span className="text-Indigo-Blue font-bold text-lg underline capitalize">
													Capture rate
												</span>
												<span className="text-Flamingo-Pink font-bold">{`${wildPokemon?.capture_rate}%`}</span>
											</div>
											<div className="w-full h-4 bg-black rounded-full">
												<div className="h-full w-3/5 bg-Forest-Green rounded-full"></div>
											</div>
										</div>
									</div>

									<div className="flex flex-col items-center">
										<div className="w-80 h-80 bg-white rounded-full flex flex-col justify-center items-center border-4 border-Indigo-Blue">
											<PokemonImg img_name={wildPokemon?.img_name} />

											<span className="text-Flamingo-Pink font-bold text-3xl capitalize">
												{wildPokemon?.name}
											</span>
										</div>
										<button
											onClick={onSkip}
											className="mt-10 py-3 px-14 bg-Midnight-Gray text-white font-bold text-xl rounded-full border-2 border-white hover:bg-white hover:text-Indigo-Blue hover:border-2 hover:border-Indigo-Blue transition-colors duration-200"
										>
											Skip
										</button>
									</div>
								</>
							)}
						</div>
					</div>
				)}
			</div>

			<Footer />
		</div>
	)
}
