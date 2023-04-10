import { Schema, model } from "mongoose"

const AccountSchema = new Schema(
	{
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			// unique: true,
		},
		hashed_pwd: {
			type: String,
			required: true,
		},
		jwt_token: {
			type: String,
			default: null,
		},
		role: {
			type: String,
			default: "user",
			enum: ["user", "admin"],
		},
		status: {
			type: String,
			lowercase: true,
			default: "active",
			enum: ["inactive", "active"],
		},
	},
	{ timestamps: true }
)

const AccountModel = model("Account", AccountSchema)

export default AccountModel
