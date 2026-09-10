import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.ts";
import * as taskService from "../services/task.service.ts";
import { sendResponse } from "../utils/apiResponse.ts";

// get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  sendResponse(res, await taskService.getAllTasks(), 200);
};

// get task by id
export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const task = await taskService.getTask(req.params.id as string);
  if (task) {
    sendResponse(res, task, 200);
  } else return next(new AppError("Task not found", 404));
};

// create new task
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const task = await taskService.createTask(req.body.title, req.body.completed);
  sendResponse(res, task, 201);
};

// update task
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const task = await taskService.updateTask(
    req.params.id as string,
    req.body.title,
    req.body.completed,
  );
  sendResponse(res, task, 200);
};

// delete task
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isDeleted = await taskService.deleteTask(req.params.id as string);
  if (isDeleted) {
    sendResponse(res, { Deleted: true }, 200);
  } else return next(new AppError("Task not found", 404));
};
