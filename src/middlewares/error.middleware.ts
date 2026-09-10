import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.ts";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let issues;
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    issues = err.errors;
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: issues,
  });
};
