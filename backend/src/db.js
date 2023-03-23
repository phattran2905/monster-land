import mongoose from "mongoose"
import logger from "./util/logger.js"

export function connectDb() {
	mongoose
		.connect(process.env.DATABASE_URI)
		.then(() => logger.info("Connected to database"))
		.catch((error) => logger.error(error))
}

export async function dropDb() {
	await mongoose.createConnection(process.env.DATABASE_URI).dropDatabase()
}
