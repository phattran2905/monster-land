import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./slices/auth";

// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query"
import { pokemonApi } from "./services/pokemon"
import { collectionApi } from "./services/collection"
import { backpackApi } from "./services/backpack"
import { authenticationApi } from "./services/authentication"

export const store = configureStore({
	reducer: {
        // Slices
        auth: authReducer,

		// Add the generated reducer as a specific top-level slice
		[collectionApi.reducerPath]: collectionApi.reducer,
		[backpackApi.reducerPath]: backpackApi.reducer,
		[pokemonApi.reducerPath]: pokemonApi.reducer,
		[authenticationApi.reducerPath]: authenticationApi.reducer,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			pokemonApi.middleware,
			collectionApi.middleware,
			backpackApi.middleware,
			authenticationApi.middleware,
		]),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
