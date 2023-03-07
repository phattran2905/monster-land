import { Schema, model, Date } from "mongoose"

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
		last_login: {
			type: Date,
			default: null,
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
