import Footer from "../components/Footer"
import Header from "../components/Header"
import MenuBar from "../components/menu/MenuBar"
import Item from "../components/Item"
import { useGetBackpackQuery } from "../redux/services/backpack"
import Loading from "../components/Loading"
import { useState } from "react"
import { useEffect } from "react"
import TabLink from "../components/backpack/TabLink"

export default function BackpackPage() {
	const { data, error, isLoading } = useGetBackpackQuery()
	const [usableItems, setUsableItem] = useState([])
	const [mysticItems, setMysticItems] = useState([])
	const [activeTab, setActiveTab] = useState("usable")

	useEffect(() => {
		if (data) {
			const usableItemList = data.item_list.filter((item) => item.type === "usable")
			const mysticItemList = data.item_list.filter((item) => item.type === "mystic")
			setUsableItem(usableItemList)
			setMysticItems(mysticItemList)
		}
	}, [data])

	const changeTab = () => {
		if (activeTab === "usable") {
			setActiveTab("mystic")
		} else {
			setActiveTab("usable")
		}
	}

	return (
		<div className="container-xl flex flex-col h-screen justify-between">
			<Header />

			<div className="w-full h-full flex flex-row relative">
				<MenuBar />

				<div className="m-10 w-full border-t-2 border-Flamingo-Pink">
					{isLoading && <Loading />}

					{!error && (
						<>
							<div className="bg-Flamingo-Pink rounded-md py-2 px-3 absolute right-1/2 top-6">
								<span className="text-white font-bold text-sm">{`${
									activeTab === "usable" ? usableItems.length : mysticItems.length
								} /${data?.capacity}`}</span>
							</div>

							<div className="h-full flex flex-row shadow-xl rounded-sm">
								<div className="w-full m-4 p-8 flex flex-row flex-wrap content-start gap-y-12 gap-x-20 overflow-auto">
									{activeTab === "usable"
										? usableItems.map((item) => (
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
										: mysticItems.map((item) => (
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

								<ul className="h-full flex flex-col">
									<li className="h-1/2">
										<TabLink
											isActive={activeTab === "usable"}
											title="Usable"
											clickHandler={changeTab}
										/>
									</li>
									<li className="h-1/2 border-t-2 border-white">
										<TabLink
											isActive={activeTab === "mystic"}
											title="Mystic"
											clickHandler={changeTab}
										/>
									</li>
								</ul>
							</div>
						</>
					)}
				</div>
			</div>

			<Footer />
		</div>
	)
}
