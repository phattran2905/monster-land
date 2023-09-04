import { config } from "dotenv";
import Express from "express";
import morgan from "morgan";
import cors from "cors";
import apiRouter from "./routes/api.js";
import { connectDb, dropDb } from "./db.js";
import createMockupData from "./mockup-data/mockup.js";
import handleErrors from "./middleware/RespondError.js";
import logger from "./util/logger.js";
import app from "./app.js";

config();
connectDb();

app.get("/", (req, res) => {
	res.send("Monster Land");
});

// Create mockup data
app.get("/api/v1/create-mockup-data", async (req, res) => {
	await dropDb();
	await createMockupData();
	res.sendStatus(201);
});

app.use("/api/v1", apiRouter);
app.use(handleErrors);

const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
	logger.info(`Server is running on port ${PORT}`);
});
