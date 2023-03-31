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
			type: [Object],
			default: [],
		},
		// monster_team: {
		// 	type: [String], // [monster_uids]
		// 	default: [],
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
MonsterCollectionSchema.virtual("detailed_monster_list", {
	ref: "MonsterInfo",
	localField: "monster_list.info_uid",
	foreignField: "uid",
})

// Populate with MonsterModel
// MonsterCollectionSchema.virtual("monster_team_info", {
// 	ref: "Monster",
// 	localField: "monster_team",
// 	foreignField: "uid",
// })

const MonsterCollectionModel = model("MonsterCollection", MonsterCollectionSchema)

export default MonsterCollectionModel
