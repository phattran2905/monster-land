import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const incubationApi = createApi({
	reducerPath: "incubationApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://monster-land-backend-phattran2905.vercel.app/api/v1/incubation" }),
	tagTypes: ["incubation"],
	endpoints: (builder) => ({
		getIncubatingEggs: builder.query({
			query: ({ jwt_token }) => ({
				method: "GET",
				headers: { Authorization: `Bearer ${jwt_token}` },
			}),
			providesTags: ["incubation"],
		}),
		getIncubatingEggByUID: builder.query({
			query: ({ jwt_token, incubation_UID }) => ({
				url: `/${incubation_UID}`,
				method: "GET",
				headers: { Authorization: `Bearer ${jwt_token}` },
			}),
			providesTags: ["incubation"],
		}),
		incubateEgg: builder.mutation({
			query: ({ jwt_token, egg_uid }) => ({
				url: `/incubate?egg_uid=${egg_uid}`,
				method: "POST",
				headers: { Authorization: `Bearer ${jwt_token}` },
			}),
			invalidatesTags: ["incubation"],
		}),
		hatchEgg: builder.mutation({
			query: ({ jwt_token, incubation_uid }) => ({
				url: `/hatch?incubation_uid=${incubation_uid}`,
				method: "POST",
				headers: { Authorization: `Bearer ${jwt_token}` },
			}),
			invalidatesTags: ["incubation"],
		}),
		skipIncubation: builder.mutation({
			query: ({ jwt_token, incubation_uid }) => ({
				url: `/skip?incubation_uid=${incubation_uid}`,
				method: "POST",
				headers: { Authorization: `Bearer ${jwt_token}` },
			}),
			invalidatesTags: ["incubation"],
		}),
	}),
})

export const {
	useGetIncubatingEggsQuery,
	useGetIncubatingEggByUIDQuery,
	useIncubateEggMutation,
	useHatchEggMutation,
    useSkipIncubationMutation
} = incubationApi
