import winston from "winston"

const customLevels = {
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		debug: 3,
	},
	colors: {
		error: "red",
		warn: "yellow",
		info: "green",
		debug: "blue",
	},
}
// winston.addColors(customLevels.colors);

const customFormat = winston.format.combine(
	winston.format.timestamp(),
	winston.format.colorize(customLevels.colors),
	winston.format.json(),
	winston.format.printf((info) => {
		const { message, timestamp, level } = info
		return `[${level}] ${timestamp} ${message}`
	})
)

const logger = winston.createLogger({
	levels: customLevels.levels,
	format: customFormat,
	transports: [new winston.transports.Console()],
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
	logger.add(
		new winston.transports.File({ filename: "error.log", level: "error" }),
		new winston.transports.File({ filename: "combined.log" })
	)
}

export default logger
