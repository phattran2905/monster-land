import mongoose from "mongoose"

export default function connectDb() {
	mongoose
		.connect(process.env.DATABASE_URI)
		.then(() => console.info("Connected to database"))
		.catch((error) => console.error(error))
}
