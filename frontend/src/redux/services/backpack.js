import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const backpackApi = createApi({
	reducerPath: "backpackApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2905/api/v1/backpack" }),
	endpoints: (builder) => ({
		getBackpack: builder.query({
			query: () => "",
		}),
	}),
})

export const { useGetBackpackQuery,  } = backpackApi
