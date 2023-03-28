import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const collectionApi = createApi({
	reducerPath: "collectionApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2905/api/v1/monster/collection" }),
	tagTypes: ["collection"],
	endpoints: (builder) => ({
		getMonsterCollection: builder.query({
			query: ({ jwt_token }) => ({
				// url: "?status=owned",
				method: "GET",
				headers: { Authorization: `Bearer ${jwt_token}` },
			}),
			providesTags: ["collection"],
		}),
	}),
})

export const { useGetMonsterCollectionQuery } = collectionApi
