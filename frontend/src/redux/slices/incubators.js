import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	incubator1: {
		index: 1,
		selected: false,
		inUse: false,
		hatchingTime: 0,
		counter: 0,
		secondsToCount: 0,
	},
	incubator2: {
		index: 2,
		selected: false,
		inUse: false,
		hatchingTime: 0,
		counter: 0,
		secondsToCount: 0,
	},
}

const incubatorSlice = createSlice({
	name: "incubators",
	initialState,
	reducers: {
		updateIncubator: (state, action) => {
			const { incubator } = action.payload

			if (incubator.index === 1) {
				for (const [key, value] of Object.entries(incubator)) {
					state.incubator1[key] = value
				}
			} else if (incubator.index === 2) {
				for (const [key, value] of Object.entries(incubator)) {
					state.incubator2[key] = value
				}
			}
		},
	},
})

export const { updateIncubator } = incubatorSlice.actions

export default incubatorSlice.reducer
