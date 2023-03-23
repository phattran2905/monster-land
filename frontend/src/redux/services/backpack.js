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
			query: ({ backpackUID, wildMonsterUID, itemToUseList }) => ({
				url: `/use?backpack=${backpackUID}&monster=${wildMonsterUID}`,
				method: "PUT",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: itemToUseList,
			}),
			invalidatesTags: ["backpack"],
		}),
	}),
})

export const { useGetBackpackQuery, useUseItemsMutation } = backpackApi
