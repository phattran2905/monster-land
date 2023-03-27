import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const incubationApi = createApi({
	reducerPath: "incubationApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2905/api/v1/backpack" }),
	tagTypes: ["incubation"],
	endpoints: (builder) => ({
		getIncubatingEggs: builder.query({
			query: ({ jwt_token }) => ({
				url: "/incubation",
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
	}),
})

export const { useGetIncubatingEggsQuery, useIncubateEggMutation, useHatchEggMutation } =
	incubationApi
