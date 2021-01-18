class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}

module.exports = {
    unauthorizedError: new UnauthorizedError(),
    notFoundError: new NotFoundError(),
};
