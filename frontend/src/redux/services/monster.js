import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define a service using a base URL and expected endpoints
export const monsterApi = createApi({
	reducerPath: "monsterApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2905/api/v1/monster" }),
	endpoints: (builder) => ({
        getMonsterByUID: builder.query({
            query: (monsterUID) => `/${monsterUID}`
        }),
		findWildMonster: builder.mutation({
			query: () => ({
				url: "/find-wild",
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
		}),
        captureWildMonster: builder.mutation({
            query: (wildMonsterUID) => ({
                url: `/capture/${wildMonsterUID}`,
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
export const { useFindWildMonsterMutation, useCaptureWildMonsterMutation, useGetMonsterByUIDQuery } = monsterApi