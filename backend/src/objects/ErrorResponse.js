class ErrorResponse {
	constructor(_statusCode, _message) {
		this.statusCode = _statusCode ?? 500
		this.message = _message ?? "Internal Server Error"
	}
}

export default ErrorResponse
