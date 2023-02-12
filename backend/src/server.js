import { config } from "dotenv"
import Express from "express"
import morgan from "morgan"
import cors from "cors"

config()

const app = Express()
app.use(cors())
app.use(morgan("dev"))

app.get("/", (req, res) => {
	res.send("Pokemon Land")
})

const PORT = process.env.PORT || 5010
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
