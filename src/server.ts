import { initApp } from "./app.js";

const port = 3000;

const startServer = async () => {
  const app = await initApp();
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
};

startServer();
