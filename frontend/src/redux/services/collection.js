import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const collectionApi = createApi({
	reducerPath: "collectionApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2905/api/v1/pokemon" }),
	endpoints: (builder) => ({
		getOwnedPokemon: builder.query({
			query: () => "?status=owned",
		}),
	}),
})

export const { useGetOwnedPokemonQuery } = collectionApi
