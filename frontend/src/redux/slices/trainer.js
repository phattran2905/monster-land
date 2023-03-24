import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	isLoading: true,
	user_uid: "",
	uid: "",
	name: "",
	username: "",
	level: 0,
	email: "",
	avatar: "",
	exp: 0,
	level_up_exp: 0,
	gold: 0,
	diamond: 0,
	stamina: 0,
	max_stamina: 0,
}

const trainerSlice = createSlice({
	name: "trainer",
	initialState,
	reducers: {
		updateTrainerInfo: (state, action) => {
			const dataToUpdate = action.payload
			for (const [key, value] of Object.entries(dataToUpdate)) {
				if (state[key] !== undefined) {
					state[key] = value
				}
			}

			state.isLoading = false
		},
	},
})

export const { updateTrainerInfo } = trainerSlice.actions

export default trainerSlice.reducer
