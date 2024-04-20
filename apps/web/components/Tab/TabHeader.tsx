import clsx from 'clsx'
import { IconType } from 'react-icons'

interface Header {
	icon?: IconType
	label?: string
}

interface TabHeaderProps {
	activeTab?: string
	headers: Header[]
	onClick: (tab?: string) => void
}

const TabHeader = ({ activeTab, headers, onClick }: TabHeaderProps) => {
	return (
		<div className="w-full flex flex-row justify-between items-center bg-Light-Indigo-Blue">
			<div className="flex flex-row">
				{!!headers?.length &&
					headers.map(({ icon: Icon, label }) => {
						return (
							<button
								className={clsx(
									`h-full flex flex-row justify-center items-center px-20 py-4`,
									activeTab === label ? 'bg-Flamingo-Pink' : 'bg-Indigo-Blue'
								)}
								key={`tab-${label}`}
								onClick={() => onClick(label)}
							>
								{Icon && <Icon className="text-white" />}
								{label && (
									<span className="ml-1 text-white font-bold text-xl capitalize">
										{label}
									</span>
								)}
							</button>
						)
					})}
			</div>
		</div>
	)
}
export default TabHeader
