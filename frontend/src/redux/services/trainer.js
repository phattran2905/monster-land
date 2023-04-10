import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const trainerApi = createApi({
	reducerPath: "trainerApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://monster-land-backend-phattran2905.vercel.app/api/v1/trainer" }),
	tagTypes: ["trainer"],
	endpoints: (builder) => ({
		createTrainer: builder.mutation({
			query: ({ jwt_token, data }) => ({
				method: "POST",
				headers: { Authorization: `Bearer ${jwt_token}` },
				body: data,
			}),
			invalidatesTags: ["trainer"],
		}),
		getTrainerInfo: builder.query({
			query: ({ jwt_token }) => ({
				method: "GET",
				headers: { Authorization: `Bearer ${jwt_token}` },
			}),
			providesTags: ["trainer"],
		}),
		updateTrainerInfo: builder.mutation({
			query: ({ jwt_token, data }) => ({
				method: "PUT",
				headers: { Authorization: `Bearer ${jwt_token}` },
				body: data,
			}),
			invalidatesTags: ["trainer"],
		}),
	}),
})

export const { useGetTrainerInfoQuery, useCreateTrainerMutation, useUpdateTrainerInfoMutation } =
	trainerApi
