import Footer from "../components/Footer"
import Header from "../components/Header"
import MenuBar from "../components/menu/MenuBar"
import Item from "../components/backpack/Item"
import { useGetBackpackQuery, useUseItemsMutation } from "../redux/services/backpack"
import Loading from "../components/Loading"
import { useState } from "react"
import { useEffect } from "react"
import { AiFillWarning } from "react-icons/ai"
import TabLink from "../components/backpack/TabLink"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Egg from "../components/backpack/Egg"
import { useIncubateEggMutation } from "../redux/services/incubation"
import IncubationConfirmModal from "../components/modal/IncubationConfirmModal"
import UseItemModal from "../components/modal/UseItemModal"
import { useGetMonsterCollectionQuery } from "../redux/services/collection"
import { updateIncubator } from "../redux/slices/incubators"

export default function BackpackPage() {
	const authState = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {
		data: backpackData,
		isLoading,
		refetch: refetchBackpackIno,
	} = useGetBackpackQuery({ jwt_token: authState.jwtToken })
	const fetchMonsterCollection = useGetMonsterCollectionQuery({ jwt_token: authState.jwtToken })
	const [incubateEgg] = useIncubateEggMutation()
	const [fetchUseItemAPI] = useUseItemsMutation()
	const [eggs, setEggs] = useState([])
	const [items, setItems] = useState([])
	const [activeTab, setActiveTab] = useState("eggs")
	const [confirmIncubateModal, setConfirmIncubateModal] = useState(false)
	const [confirmItemUseModal, setConfirmItemUseModal] = useState(false)
	const [selectedEgg, setSelectedEgg] = useState("")
	const [selectedItem, setSelectedItem] = useState("")
	const [error, setError] = useState()

	useEffect(() => {
		refetchBackpackIno()

		document.title = "Monster Land - Backpack"
	}, [])

	// Redirect to login if not logged in
	useEffect(() => {
		if (!authState.isLoggedIn) {
			return navigate("/login")
		}
	}, [authState.isLoggedIn])

	// Set Items and Eggs
	useEffect(() => {
		if (backpackData) {
			const items = backpackData.item_list
			const eggs = backpackData.egg_list
			setItems(items)
			setEggs(eggs)
		}
	}, [backpackData])

	const changeTab = () => {
		if (activeTab === "eggs") {
			setActiveTab("items")
		} else {
			setActiveTab("eggs")
		}
	}

	const incubateEggByUID = async (eggUID) => {
		setError()
		const incubationResult = await incubateEgg({
			jwt_token: authState.jwtToken,
			egg_uid: eggUID,
		})

		// Set new monster data
		if (incubationResult?.data) {
            refetchBackpackIno()
            dispatch(
                updateIncubator({
                    incubation: incubationResult?.data,
                })
            )
			return navigate("/incubation")
		}

		if (incubationResult?.error.data) {
			setError(incubationResult?.error.data.message)
		}

		setConfirmIncubateModal(false)
	}

	const onSelectEgg = (egg) => {
		setError()
		setConfirmIncubateModal(true)
		setSelectedEgg(egg)
	}

	const onSelectItem = (item) => {
		setError()
		setConfirmItemUseModal(true)
		setSelectedItem(item)
	}

	const onUseItem = async (item) => {
		setError()
		setConfirmItemUseModal(false)
		setSelectedItem(item)

		if (item < 1 || item.amountToUse > item.amount) {
			return setError("The amount is invalid.")
		}

		const result = await fetchUseItemAPI({
			jwt_token: authState.jwtToken,
			monster_uid: item.monster_uid,
			items: [{ amount: item.amountToUse, uid: item.uid }],
		})

		// Has error
		if (result?.error) {
			setError(result?.error.data.message)
		} else {
			setError()
			fetchMonsterCollection.refetch()
			console.log(result)
		}
	}

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row relative overflow-hidden">
				<MenuBar />

				<div className="m-10 w-full relative">
					{/* Modals */}
					{confirmIncubateModal && (
						<IncubationConfirmModal
							onClose={() => setConfirmIncubateModal(false)}
							onConfirm={() => incubateEggByUID(selectedEgg?.uid)}
							eggName={selectedEgg?.name}
						/>
					)}
					{confirmItemUseModal && (
						<UseItemModal
							onClose={() => setConfirmItemUseModal(false)}
							onConfirm={() => incubateEggByUID(selectedEgg?.uid)}
							itemToUse={selectedItem}
							onUse={onUseItem}
						/>
					)}

					{/* Content */}
					{isLoading ? (
						<Loading />
					) : (
						<div className="h-full flex flex-col shadow-lg rounded-sm">
							{/* Tabs */}
							<div className="flex flex-row justify-between items-center bg-Light-Indigo-Blue">
								<ul className="flex flex-row">
									<li>
										<TabLink
											isActive={activeTab === "eggs"}
											title="Eggs"
											clickHandler={changeTab}
										/>
									</li>
									<li>
										<TabLink
											isActive={activeTab === "items"}
											title="Items"
											clickHandler={changeTab}
										/>
									</li>
								</ul>

								{/* Error */}
								{error && (
									<div className="bg-Fire-Engine-Red py-2 px-4 mr-4 rounded-md">
										<p className="text-lg font-bold text-white flex flex-row items-center">
											<AiFillWarning className="text-white mx-1" />
											{error}
										</p>
									</div>
								)}
							</div>

							{/* Items and Eggs */}
							<div className="h-full p-14 flex flex-row flex-wrap content-start gap-y-12 gap-x-20 overflow-auto rounded-sm bg-light-white">
								{activeTab === "eggs" ? (
									eggs.length === 0 ? (
										<div className="h-full w-full flex flex-row justify-center items-center">
											<span className="inline-block text-Dim-Gray bg-Anti-flash-white font-bold py-2 px-10 rounded-full italic my-auto">
												You have no eggs
											</span>
										</div>
									) : (
										eggs.map((item) => (
											<Egg
												key={item.uid}
												uid={item.uid}
												name={item.name}
												img_name={item.img_name}
												hatching_time_in_seconds={
													item.hatching_time_in_seconds
												}
												monster_type={item.monster_type}
												amount={item.amount}
												onSelect={onSelectEgg}
											/>
										))
									)
								) : items.length === 0 ? (
									<div className="h-full w-full flex flex-row justify-center items-center">
										<span className="inline-block text-Dim-Gray bg-Anti-flash-white font-bold py-2 px-10 rounded-full italic my-auto">
											You have no items
										</span>
									</div>
								) : (
									items.map((item) => (
										<Item
											key={item.uid}
											uid={item.uid}
											name={item.name}
											img_name={item.img_name}
											effect_property={item.effect_property}
											effect_value={item.effect_value}
											amount={item.amount}
											onSelect={onSelectItem}
										/>
									))
								)}
							</div>

							{/* Quantity */}
							<div className="flex flex-row justify-center mt-auto">
								<div className="bg-Midnight-Gray  inline-block rounded-full px-10 py-2 my-3">
									{activeTab === "items" && (
										<span className="text-Gold-Sand font-bold">
											{items.length}
										</span>
									)}
									{activeTab === "eggs" && (
										<span className="text-Gold-Sand font-bold">
											{eggs.length}
										</span>
									)}
									<span className="text-white">
										{" "}
										/{" "}
										{activeTab === "eggs"
											? backpackData?.capacity.egg
											: backpackData?.capacity.item}
									</span>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			<Footer />
		</div>
	)
}
