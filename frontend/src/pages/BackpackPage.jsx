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

export default function BackpackPage() {
	const authState = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { data: backpackData, isLoading } = useGetBackpackQuery({ jwt_token: authState.jwtToken })
	const [eggs, setEggs] = useState([])
	const [items, setItems] = useState([])
	const [activeTab, setActiveTab] = useState("eggs")

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

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row relative overflow-hidden">
				<MenuBar />

				<div className="m-10 w-full">
					{isLoading ? (
						<Loading />
					) : (
						<div className="h-full flex flex-col shadow-xl rounded-sm">
							{/* Tabs */}
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
												hatching_time_in_seconds={item.hatching_time_in_seconds}
												monster_type={item.monster_type}
												amount={item.amount}
												onSelect={() => {}}
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
							<div className="bg-Indigo-Blue flex flex-row justify-center mt-auto">
								<div className="bg-white inline-block rounded-full px-10 py-2 my-3">
									{activeTab === "items" && (
										<span className="text-Flamingo-Pink font-bold">
											{items.length}
										</span>
									)}
									{activeTab === "eggs" && (
										<span className="text-Flamingo-Pink font-bold">
											{eggs.length}
										</span>
									)}
									<span className="text-black"> / {backpackData?.capacity}</span>
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
