import mongoose from "mongoose"

export function connectDb() {
	mongoose
		.connect(process.env.DATABASE_URI)
		.then(() => console.info("Connected to database"))
		.catch((error) => console.error(error))
}

export async function dropDb() {
	await mongoose.createConnection(process.env.DATABASE_URI).dropDatabase()
}
