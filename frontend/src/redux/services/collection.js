import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const collectionApi = createApi({
	reducerPath: "collectionApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2905/api/v1/monster" }),
	tagTypes: ["collection"],
	endpoints: (builder) => ({
		getOwnedMonster: builder.query({
			query: () => "?status=owned",
		}),
        invalidatesTags: ["collection"],
	}),
})

export const { useGetOwnedMonsterQuery } = collectionApi
