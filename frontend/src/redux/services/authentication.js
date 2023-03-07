import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authenticationApi = createApi({
	reducerPath: "authenticationApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2905/api/v1/" }),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: ({ username, password }) => ({
				url: "/login",
				method: "POST",
				body: { username, password },
			}),
		}),
	}),
})

export const { useLoginMutation } = authenticationApi