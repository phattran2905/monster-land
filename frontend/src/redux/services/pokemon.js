import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
	reducerPath: "pokemonApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2905/api/v1/pokemon" }),
	endpoints: (builder) => ({
        getPokemonByUID: builder.query({
            query: (pokemonUID) => `/${pokemonUID}`
        }),
		findWildPokemon: builder.mutation({
			query: () => ({
				url: "/find-wild",
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
		}),
        captureWildPokemon: builder.mutation({
            query: (wildPokemonUID) => ({
                url: `/capture/${wildPokemonUID}`,
				method: "PUT",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
            })
        })
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useFindWildPokemonMutation, useCaptureWildPokemonMutation, useGetPokemonByUIDQuery } = pokemonApi
