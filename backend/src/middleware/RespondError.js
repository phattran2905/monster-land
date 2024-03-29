import ErrorResponse from "../objects/ErrorResponse.js"
import logger from "../util/logger.js"

export default function handleErrors(error, req, res, next) {
	let statusCode = 500
	let message = "Internal Server Error"

	if (error instanceof ErrorResponse) {
		statusCode = error.statusCode
		message = error.message
	} else if (error instanceof Error) {
		logger.error(error)
	}

	return res.status(statusCode).json({ message })
}
