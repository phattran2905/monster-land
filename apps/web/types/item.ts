export interface Item {
	amount: number
	created_at: string
	effect_property: string
	effect_value: number
	image: string
	item_type?: { name: string; uid: string }
	item_type_uid: string
	name: string
	uid: string
}
