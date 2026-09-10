import { AppDataSource } from "../database/data-source.ts";
import { Task } from "../entities/task.entity.ts";

const repo = AppDataSource.getRepository(Task);

export const getAllTasks = async () => {
  return await repo.find();
};

export const getTask = async (id: string) => {
  return repo.findOne({
    where: { id },
  });
};

export const createTask = async (title: string, completed: boolean = false) => {
  const task = repo.create({ title, completed });
  return repo.save(task);
};

export const updateTask = async (
  id: string,
  title?: string,
  completed?: boolean,
) => {
  const task = await repo.findOne({ where: { id } });
  if (!task) return null;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  return repo.save(task);
};

export const deleteTask = async (id: string) => {
  const task = await repo.findOne({ where: { id } });
  if (!task) return false;
  return repo.remove(task);
};
