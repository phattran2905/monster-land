import { createClient } from '@utils/supabase/server'

const supabase = createClient()

export const getUser = async () => {
	return await supabase.auth.getUser()
}
