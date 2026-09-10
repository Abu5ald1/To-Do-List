import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().trim().min(1),
  completed: z.boolean().optional().default(false),
});

export const UpdateTaskSchema = z.object({
  title: z.string().trim().min(1).optional(),
  completed: z.boolean().optional(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;
