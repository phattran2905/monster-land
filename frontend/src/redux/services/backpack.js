import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const backpackApi = createApi({
	reducerPath: "backpackApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2905/api/v1/backpack" }),
	tagTypes: ["backpack"],
	endpoints: (builder) => ({
		getBackpack: builder.query({
			query: ({ jwt_token }) => ({
				method: "GET",
				headers: { Authorization: `Bearer ${jwt_token}` },
			}),
			providesTags: ["backpack"],
		}),
		useItems: builder.mutation({
			query: ({ jwt_token, monster_uid, items }) => ({
				url: `/use?monster=${monster_uid}`,
				method: "PUT",
				headers: { Authorization: `Bearer ${jwt_token}` },
				body: items, // [{item_uid, amount}]
			}),
			invalidatesTags: ["backpack"],
		}),
	}),
})

export const { useGetBackpackQuery, useUseItemsMutation } = backpackApi
