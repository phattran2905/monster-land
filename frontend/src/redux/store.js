import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./slices/auth"
import trainerReducer from "./slices/trainer"
import incubatorsReducer from "./slices/incubators"

// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query"
import { monsterApi } from "./services/monster"
import { collectionApi } from "./services/collection"
import { backpackApi } from "./services/backpack"
import { authenticationApi } from "./services/authentication"
import { incubationApi } from "./services/incubation"
import { trainerApi } from "./services/trainer"
import { challengeApi } from "./services/challenge"

export const store = configureStore({
	reducer: {
		// Slices
		auth: authReducer,
		trainer: trainerReducer,
		incubators: incubatorsReducer,

		// Add the generated reducer as a specific top-level slice
		[collectionApi.reducerPath]: collectionApi.reducer,
		[backpackApi.reducerPath]: backpackApi.reducer,
		[incubationApi.reducerPath]: incubationApi.reducer,
		[monsterApi.reducerPath]: monsterApi.reducer,
		[authenticationApi.reducerPath]: authenticationApi.reducer,
		[trainerApi.reducerPath]: trainerApi.reducer,
		[challengeApi.reducerPath]: challengeApi.reducer,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			monsterApi.middleware,
			collectionApi.middleware,
			backpackApi.middleware,
			authenticationApi.middleware,
			incubationApi.middleware,
			trainerApi.middleware,
			challengeApi.middleware,
		]),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
