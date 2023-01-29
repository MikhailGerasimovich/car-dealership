import express from 'express';
import { initializeDB } from './db/initialize.js';
import { env } from './env.js';
import { router } from './routers/routing.js';

const app = express();

app.use(express.json());
app.use(router);

const start = async (app) => {
  await initializeDB.initialize(app);
  app.listen(env.application.port, env.application.host, () => {
    console.log('Server start...');
  });
};

await start(app);

/*
  todo
  - apply prettier for all files
  - correct 'project info' to normal view
  - remove all comments (maybe)
  - look through variables naming
  + move db constant form file index in model directory to file db in db directory
  - look through end points (if some from them incorrect or redundant remove or change them)
*/
