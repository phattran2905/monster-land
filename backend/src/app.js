import { config } from "dotenv";
import Express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDb, dropDb } from "./db.js";

config();
connectDb();

const app = Express();
app.use(
	cors({
		origin: ["https://monster-land.netlify.app", "http://localhost:5173"],
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
		preflightContinue: true,
	})
);
app.use(morgan("dev"));
app.use(Express.json());

export default app;
