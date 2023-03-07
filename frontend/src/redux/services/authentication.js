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
		logout: builder.mutation({
			query: ({ jwt_token }) => ({
				url: "/logout",
				method: "PUT",
				headers: { Authorization: `Bearer ${jwt_token}` },
			}),
		}),
	}),
})

export const { useLoginMutation, useLogoutMutation } = authenticationApi
