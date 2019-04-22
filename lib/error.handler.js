// Application error
class AppError extends Error {
  constructor(message, code) {
    super();

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || "Something went wrong.";
    this.status = code || 500;
  }
}

// DB error
class DBError extends AppError {
  constructor(message) {
    super(message || "Database Error", 503);
  }
}

// 404 Error
class NotFound extends AppError {
  constructor(message) {
    super(message || "Not Found", 404);
  }
}

// Validation Error
class ValidationError extends AppError {
  constructor(message) {
    super(message || "Validation Error", 401);
  }
}

// Catch other errors and pass the errors to the error handler
const asyncError = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  DBError,
  NotFound,
  ValidationError,
  asyncError
};
