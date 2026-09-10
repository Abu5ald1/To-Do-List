import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { validate } from "../middlewares/validation.middleware.ts";
import {
  CreateTaskSchema,
  UpdateTaskSchema,
} from "../validations/task.validation.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";

const router = express.Router();

router.get("/", asyncHandler(getAllTasks));

router.get("/:id", asyncHandler(getTaskById));

router.post("/", validate(CreateTaskSchema), asyncHandler(createTask));

router.patch("/:id", validate(UpdateTaskSchema), asyncHandler(updateTask));

router.delete("/:id", asyncHandler(deleteTask));

export default router;
