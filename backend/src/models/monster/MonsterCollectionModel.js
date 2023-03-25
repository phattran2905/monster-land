import { Schema, model } from "mongoose"

const MonsterCollectionSchema = new Schema(
	{
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		user_uid: {
			type: String,
			required: true,
			unique: true,
		},
		monster_list: {
			type: [String], // [monster_uids]
			default: [],
		},
		monster_team: {
			type: [String], // [monster_uids]
			default: [],
		},
		// team_member_limit: {
		// 	type: Number,
		// 	default: 1,
		// },
		capacity: {
			type: Number,
			required: true,
			default: 0,
		},
		status: {
			type: String,
			lowercase: true,
			enum: ["active", "inactive"],
			default: "active",
		},
	},
	{ timestamps: true }
)

// Populate with TrainerModel
MonsterCollectionSchema.virtual("trainer_info", {
	ref: "Trainer",
	localField: "user_uid",
	foreignField: "user_uid",
	justOne: true,
})

// Populate with MonsterModel
MonsterCollectionSchema.virtual("monster_list_info", {
	ref: "MonsterInfo",
	localField: "monster_list",
	foreignField: "uid",
})

// Populate with MonsterModel
MonsterCollectionSchema.virtual("monster_team_info", {
	ref: "Monster",
	localField: "monster_team",
	foreignField: "uid",
})

const MonsterCollectionModel = model("MonsterCollection", MonsterCollectionSchema)

export default MonsterCollectionModel
