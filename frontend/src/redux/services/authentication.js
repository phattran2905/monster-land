import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authenticationApi = createApi({
	reducerPath: "authenticationApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2905/api/v1/" }),
	tagTypes: ["auth"],
	endpoints: (builder) => ({
		signUp: builder.mutation({
			query: ({ username, password, confirm }) => ({
				url: "/sign-up",
				method: "POST",
				body: { username, password, confirm },
			}),
			invalidatesTags: ["auth"],
		}),
		login: builder.mutation({
			query: ({ username, password }) => ({
				url: "/login",
				method: "POST",
				body: { username, password },
			}),
			invalidatesTags: ["auth"],
		}),
		logout: builder.mutation({
			query: ({ jwt_token }) => ({
				url: "/logout",
				method: "PUT",
				headers: { Authorization: `Bearer ${jwt_token}` },
			}),
			invalidatesTags: ["auth"],
		}),
	}),
})

export const { useLoginMutation, useLogoutMutation, useSignUpMutation } = authenticationApi
