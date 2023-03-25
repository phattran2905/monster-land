import { Schema, model } from "mongoose"

const GSSettingSchema = new Schema(
	{
		trainer_lvl_up_exp_base: {
			type: Number,
			required: true,
		},
		trainer_lvl_up_exp_rate: {
			type: Number,
			required: true,
		},
		monster_lvl_up_exp_base: {
			type: Number,
			required: true,
		},
		monster_lvl_up_exp_rate: {
			type: Number,
			required: true,
		},
		monster_team_member_limit: {
			type: Number,
			required: true,
		},
		monster_collection_limit: {
			type: Number,
			required: true,
		},
		backpack_item_list_capacity_base_rate: {
			type: Number,
			required: true,
		},
		backpack_egg_list_capacity_base_rate: {
			type: Number,
			required: true,
		},
		backpack_capacity_up_rate: {
			type: Number,
			required: true,
		},
		stamina_restore_rate: {
			type: Number,
			required: true,
		},
		stamina_lvl_up_rate: {
			type: Number,
			required: true,
		},
		stamina_restore_in_seconds: {
			type: Number,
			required: true,
		},
		total_avatar_images: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ["inactive", "active"],
			default: "active",
		},
	},
	{ timestamps: true }
)

const GSSettingModel = model("GameServerSetting", GSSettingSchema)

export default GSSettingModel
