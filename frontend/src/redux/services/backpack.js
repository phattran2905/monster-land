import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const backpackApi = createApi({
	reducerPath: "backpackApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2905/api/v1/backpack" }),
	endpoints: (builder) => ({
		getBackpack: builder.query({
			query: () => "",
		}),
		useItems: builder.mutation({
			query: ({ backpackUID, wildPokemonUID, itemToUseList }) => ({
				url: `/use?backpack=${backpackUID}&pokemon=${wildPokemonUID}`,
				method: "PUT",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: itemToUseList,
			}),
		}),
	}),
})

export const { useGetBackpackQuery, useUseItemsMutation } = backpackApi
