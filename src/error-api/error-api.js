class ErrorApi extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }

    static serverError(message) {
        return new ErrorApi(message, 500);
    }

    static notFound(message) {
        return new ErrorApi(message, 404);
    }

    static unauthorized(message) {
        return new ErrorApi(message, 401);
    }

    static badRequest(message) {
        return new ErrorApi(message, 400);
    }
}

module.exports = ErrorApi;