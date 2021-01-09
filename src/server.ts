import * as koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-bodyparser';
import { taskRouter } from './routes/taskRoutes';
import { sequelize } from './database/setup';

const app = new koa();
const PORT_NUMBER = 3000;

(async () => {
  await sequelize.sync();
  app.use(cors());
  app.use(json());
  app.use(logger());
  app.use(bodyParser());
  app.use(taskRouter.routes()).use(taskRouter.allowedMethods());

  app.listen(PORT_NUMBER, () => {
    console.log(`Koa server started at localhost:${PORT_NUMBER}`);
  });
})();
