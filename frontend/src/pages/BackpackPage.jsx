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

export default function BackpackPage() {
	const authState = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {
		data: backpackData,
		error,
		isLoading,
		isSuccess,
	} = useGetBackpackQuery({ jwt_token: authState.jwtToken })
	const [eggs, setEggs] = useState([])
	const [items, setItems] = useState([])
	const [activeTab, setActiveTab] = useState("eggs")

	useEffect(() => {
		dispatch(getStoredJwtToken())
		// Redirect to login if not logged in
		if (!authState.isLoggedIn) {
			return navigate("/login", { replace: true })
		}
	}, [authState.isLoggedIn])

	useEffect(() => {
		if (isSuccess) {
			const items = backpackData.item_list
			const eggs = backpackData.eggs
			setItems(items)
			// setEggs(eggs)
		}
	}, [])

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

			<div className="w-full h-full flex flex-row relative">
				<MenuBar />

				<div className="m-10 w-full ">
					{isLoading && <Loading />}

					{!error && (
						<div className="flex flex-col shadow-xl rounded-sm">
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

							<div className="p-14 flex flex-row flex-wrap content-start gap-y-12 gap-x-20 overflow-auto border-2 border-Royal-Blue rounded-sm">
								{activeTab === "eggs"
									? eggs.map((item) => (
											<div
												key={item.uid}
												className="w-80 p-4 h-24 border-2 border-Flamingo-Pink rounded-xl flex flex-row justify-around items-center"
											>
												<Item
													uid={item.uid}
													name={item.name}
													img_name={item.img_name}
													effect_property={item.effect_property}
													effect_value={item.effect_value}
													amount={item.amount}
												/>
											</div>
									  ))
									: items.map((item) => (
											<div
												key={item.uid}
												className="w-80 p-4 h-24 border-2 border-Flamingo-Pink rounded-xl flex flex-row justify-around items-center"
											>
												<Item
													uid={item.uid}
													name={item.name}
													img_name={item.img_name}
													effect_property={item.effect_property}
													effect_value={item.effect_value}
													amount={item.amount}
												/>
											</div>
									  ))}
							</div>
						</div>
					)}
				</div>
			</div>

			<Footer />
		</div>
	)
}
