'use client'
import MonsterCard from '@components/Card/MonsterCard'
import Loading from '@components/Loading'
import { useState } from 'react'

interface Props {}
const CollectionPage = (props: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	const monsters = [1]
	return (
		<section className="relative h-full flex items-stretch">
			<div className="p-2 sm:p-4 md:p-8 w-full">
				{isLoading ? (
					<Loading type="circle" />
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
								monsters?.map((monster) => (
									<MonsterCard
									// attack={monster.attack}
									// defense={monster.defense}
									// exp={monster.exp}
									// img_name={monster.img_name}
									// key={monster.uid}
									// level={monster.level}
									// level_up_exp={monster.level_up_exp}
									// name={monster.name}
									// type={monster.monster_type}
									// uid={monster.uid}
									/>
								))
							)}
						</div>
						{/* Quantity */}
						<div className="bg-white flex flex-row justify-center mt-auto">
							<div className="bg-Midnight-Gray inline-block rounded-full px-10 py-2 my-3">
								<span className="text-Gold-Sand font-bold">
									{monsters.length}
								</span>
								<span className="text-white"> / 50</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	)
}
export default CollectionPage
