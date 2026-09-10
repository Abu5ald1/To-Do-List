import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.ts";

export const routesMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new AppError("Not Found !", 404));
};
