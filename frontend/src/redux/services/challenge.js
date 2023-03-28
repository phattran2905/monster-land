import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const challengeApi = createApi({
	reducerPath: "challengeApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2905/api/v1/challenges" }),
	tagTypes: ["challenge"],
	endpoints: (builder) => ({
		getChallengeList: builder.query({
			query: () => ({
				method: "GET",
			}),
			providesTags: ["challenge"],
		}),
		battleBoss: builder.mutation({
			query: ({ jwt_token, stageUID, monsterUID, challengeUID }) => ({
				url: `?stage_uid=${stageUID}&monster_uid=${monsterUID}&challenge_uid=${challengeUID}`,
				method: "PUT",
				headers: { Authorization: `Bearer ${jwt_token}` },
			}),
			invalidatesTags: ["challenge"],
		}),
	}),
})

export const { useGetChallengeListQuery, useBattleBossMutation } = challengeApi
