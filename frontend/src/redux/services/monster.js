import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define a service using a base URL and expected endpoints
export const monsterApi = createApi({
	reducerPath: "monsterApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://monster-land-backend.vercel.app/api/v1/monster",
	}),
	endpoints: (builder) => ({
		getMonsterByUID: builder.query({
			query: (monsterUID) => `/${monsterUID}`,
			providesTags: ["monster"],
		}),
		getTopMonsters: builder.query({
			query: () => `/top`,
			keepUnusedDataFor: 10,
			providesTags: ["monster"],
		}),
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMonsterByUIDQuery, useGetTopMonstersQuery } = monsterApi
