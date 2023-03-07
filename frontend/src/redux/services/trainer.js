import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const trainerApi = createApi({
	reducerPath: "trainerApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2905/api/v1/trainer" }),
	endpoints: (builder) => ({
		createTrainer: builder.mutation({
			query: ({ jwt_token, data }) => ({
				method: "POST",
				headers: { Authorization: `Bearer ${jwt_token}` },
				body: data,
			}),
		}),
		getTrainerInfo: builder.query({
			query: ({ jwt_token }) => ({
				method: "GET",
				headers: { Authorization: `Bearer ${jwt_token}` },
			}),
		}),
		updateTrainerInfo: builder.mutation({
			query: ({ jwt_token, data }) => ({
				method: "PUT",
				headers: { Authorization: `Bearer ${jwt_token}` },
				body: data,
			}),
		}),
	}),
})

export const { useGetTrainerInfoQuery, useCreateTrainerMutation, useUpdateTrainerInfoMutation } =
	trainerApi
