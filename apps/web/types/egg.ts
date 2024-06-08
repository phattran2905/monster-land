export interface Egg {
	amount: number
	created_at: string
	hatching_time: number
	image: string
	monster_type?: { name?: string; uid?: string }
	monster_type_uid: string
	name: string
	uid: string
}
