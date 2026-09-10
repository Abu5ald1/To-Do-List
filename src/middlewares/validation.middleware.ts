import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.ts";
import { ZodType } from "zod";

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return next(new AppError("Invalid input", 400, errors));
    }
    req.body = result.data;
    next();
  };
};
