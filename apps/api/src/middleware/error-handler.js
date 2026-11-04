import { AppError } from "@omniops/shared";

export function errorHandler(err, req, res, next) {
  // If headers already sent, delegate to default express error handler
  if (res.headersSent) {
    return next(err);
  }

  const isProduction = process.env.NODE_ENV === "production";
  const statusCode = err.statusCode || (err instanceof AppError ? err.statusCode : 500);
  const errorCode = err.code || "INTERNAL_SERVER_ERROR";
  const message = err.message || "An unexpected operational error occurred";

  if (statusCode >= 500) {
    console.error(`[UnhandledError] ${req.method} ${req.url}:`, err);
  }

  res.status(statusCode).json({
    error: {
      code: errorCode,
      message: message,
      details: err.details || null,
      ...(isProduction ? {} : { stack: err.stack })
    }
  });
}
