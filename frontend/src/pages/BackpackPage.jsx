import Footer from "../components/Footer"
import Header from "../components/Header"
import MenuBar from "../components/menu/MenuBar"
import Item from "../components/backpack/Item"
import { useGetBackpackQuery } from "../redux/services/backpack"
import Loading from "../components/Loading"
import { useState } from "react"
import { useEffect } from "react"
import TabLink from "../components/backpack/TabLink"
import { useDispatch, useSelector } from "react-redux"
import { getStoredJwtToken } from "../redux/slices/auth"
import { useNavigate } from "react-router-dom"
import Egg from "../components/backpack/Egg"
import { useIncubateEggMutation } from "../redux/services/incubation"
import IncubationConfirmModal from "../components/modal/IncubationConfirmModal"

export default function BackpackPage() {
	const authState = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {
		data: backpackData,
		isLoading,
		refetch: refetchBackpackIno,
	} = useGetBackpackQuery({ jwt_token: authState.jwtToken })
	const [incubateEgg] = useIncubateEggMutation()
	const [eggs, setEggs] = useState([])
	const [items, setItems] = useState([])
	const [activeTab, setActiveTab] = useState("eggs")
	const [confirmIncubateModal, setConfirmIncubateModal] = useState(false)
	const [selected, setSelected] = useState("")

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
		console.log(eggUID)
		const incubationResult = await incubateEgg({
			jwt_token: authState.jwtToken,
			egg_uid: eggUID,
		})
		console.log(incubationResult)
		// Set new monster datal
		if (incubationResult?.data) {
			navigate("/incubation")
		}
	}

	const onSelect = (item) => {
		setConfirmIncubateModal(true)
		setSelected(item)
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
							onConfirm={() => incubateEggByUID(selected?.uid)}
							eggName={selected?.name}
						/>
					)}

					{/* Content */}
					{isLoading ? (
						<Loading />
					) : (
						<div className="h-full flex flex-col shadow-xl rounded-sm">
							{/* Tabs */}
							<ul className="flex flex-row bg-light-white">
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

							{/* Items and Eggs */}
							<div className="h-full p-14 flex flex-row flex-wrap content-start gap-y-12 gap-x-20 overflow-auto rounded-sm">
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
												onSelect={onSelect}
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
											onSelect={() => {}}
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
