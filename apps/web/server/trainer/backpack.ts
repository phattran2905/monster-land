'use server'

import { BackpackType } from '@type/backpack'
import { createClient } from '@utils/supabase/server'
import { revalidatePath } from 'next/cache'
import 'server-only'

export const getBackpack = async () => {
	const supabase = createClient()
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser()

	if (error) {
		return {
			message: error.message,
			status: 'error',
		}
	}

	const { data: backpack } = await supabase
		.from('backpacks')
		.select(
			`
      uid, egg_capacity, item_capacity,
      backpack_egg_records ( 
        eggs ( 
          *,
          "monster_type": monster_types(*)
        ), 
        amount 
      ),
      backpack_item_records ( 
        items ( 
          *,
          "item_type": item_types (*) 
        ), 
        amount 
       )
    `
		)
		.eq('uid', user?.id)
		.single()

	const backpackData: BackpackType = {
		egg_capacity: backpack?.egg_capacity,
		eggs: backpack?.backpack_egg_records.map(({ amount, eggs }) => ({
			...eggs,
			amount,
		})),
		item_capacity: backpack?.item_capacity,
		items: backpack?.backpack_item_records.map(({ amount, items }) => ({
			...items,
			amount,
		})),
		uid: backpack?.uid,
	}

	revalidatePath('/backpacks')
	return {
		message: 'Backpack fetched successfully',
		result: backpackData,
		status: 'success',
	}
}
