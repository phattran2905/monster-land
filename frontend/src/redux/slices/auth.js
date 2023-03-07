import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	isLoggedIn: false,
	jwtToken: null,
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		getStoredJwtToken: (state) => {
			const jwtToken = localStorage.getItem("jwt_token")
            
			if (jwtToken) {
				state.isLoggedIn = true
				state.jwtToken = jwtToken
			}
		},
		saveJwtToken: (state, action) => {
			const jwtToken = localStorage.setItem("jwt_token", action.payload)

			state.isLoggedIn = true
			state.jwtToken = jwtToken
		},
		logout: (state) => {
			localStorage.removeItem("jwt_token")
			state = { ...initialState }
		},
	},
})

export const { getStoredJwtToken, saveJwtToken, logout } = authSlice.actions

export default authSlice.reducer
