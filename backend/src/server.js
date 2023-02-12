import { config } from "dotenv"
import Express from "express"
import morgan from "morgan"
import cors from "cors"
import apiRouter from "./routes/api.js"
import connectDb from "./db.js"

config()
connectDb()

const app = Express()
app.use(cors())
app.use(morgan("dev"))

app.get("/", (req, res) => {
	res.send("Pokemon Land")
})

app.use("/api/v1", apiRouter)

const PORT = process.env.PORT || 5010
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
