import express from "express";
import router from "./routes/task.routes.ts";
import { errorMiddleware } from "./middlewares/error.middleware.ts";
import { routesMiddleware } from "./middlewares/routes.middleware.ts";
import { AppDataSource } from "./database/data-source.js";

const app = express();

export const initApp = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database Connected !");
  } catch (err) {
    console.error("Database connection has failed", err);
    throw err;
  }
  return app;
};

app.use(express.json());
app.use("/api/tasks", router);

// bad routes error handling
app.use(routesMiddleware);

// error handling
app.use(errorMiddleware);
