import { Egg } from '@type/egg'
import { Item } from '@type/item'

export interface BackpackType {
	egg_capacity?: number
	eggs?: Egg[] | any
	item_capacity?: number
	items?: Item[] | any
	uid?: string
}
