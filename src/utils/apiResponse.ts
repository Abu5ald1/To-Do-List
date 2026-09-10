import type { Request, Response } from "express";
import type { Task } from "../data/task.data.ts";

export const sendResponse = <T>(res: Response, data: T, statusCode: number) => {
  return res.status(statusCode).json({
    success: true,
    data: data,
  });
};
