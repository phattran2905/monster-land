import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	selectedIndex: 0,
	incubator1: {
		index: 1,
		inUse: false,
		hatchingTime: 0,
		counter: 0,
		secondsToCount: 0,
	},
	incubator2: {
		index: 2,
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
		selectIncubator: (state, action) => {
			state.selectedIndex = action.payload
		},
		updateIncubator: (state, action) => {
			const { incubation } = action.payload
            
			// Update either one incubation
			if (state.selectedIndex === 1 || state.selectedIndex === 2) {
				for (const [key, value] of Object.entries(incubation)) {
					if (state.selectedIndex === 1) {
						state.incubator1[key] = value
					} else if (state.selectedIndex === 2) {
						state.incubator2[key] = value
					}
				}
			}
			// Update both
			else if (state.selectedIndex === 0) {
				if (incubation[0]) {
					for (const [key, value] of Object.entries(incubation[0])) {
						state.incubator1[key] = value
					}
				}
				if (incubation[1]) {
					for (const [key, value] of Object.entries(incubation[1])) {
						state.incubator2[key] = value
					}
				}
			}
		},
		resetIncubator: (state, action) => {
			const index = action.payload

			if (index === 1) {
				state.incubator1 = initialState.incubator1
			}

			if (index === 2) {
				state.incubator2 = initialState.incubator2
			}
		},
	},
})

export const { updateIncubator, selectIncubator, resetIncubator } = incubatorSlice.actions

export default incubatorSlice.reducer
