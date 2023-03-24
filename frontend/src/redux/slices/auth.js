import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	isLoading: true,
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
			} else if (sessionStorage.getItem("jwt_token")) {
				state.isLoggedIn = true
				state.jwtToken = sessionStorage.getItem("jwt_token")
			}
			state.isLoading = false
		},
		saveJwtToken: (state, action) => {
			localStorage.setItem("jwt_token", action.payload)
			state.jwtToken = action.payload
			state.isLoading = false
		},
		login: (state, action) => {
			state.isLoggedIn = true
			state.jwtToken = action.payload

			sessionStorage.setItem("jwt_token", action.payload)
			state.isLoading = false
		},
		logout: (state) => {
			localStorage.removeItem("jwt_token")
			sessionStorage.removeItem("jwt_token")

			state.isLoggedIn = false
			state.jwtToken = null
			state.isLoading = false
		},
	},
})

export const { getStoredJwtToken, saveJwtToken, login, logout } = authSlice.actions

export default authSlice.reducer
