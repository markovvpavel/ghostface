import { ErrorRequestHandler } from "express";
import { ValidationError } from "sequelize";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Error:", err); // Useful for debugging

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Sequelize Validation Errors
  if (err instanceof ValidationError) {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  }

  res.status(statusCode).json({
    status: "error",
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
