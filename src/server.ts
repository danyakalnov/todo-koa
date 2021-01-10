import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as cors from '@koa/cors';
import * as KoaRouter from '@koa/router';
import * as bodyParser from 'koa-bodyparser';
import { taskRouter } from './routes/taskRoutes';
import { sequelize } from './database/setup';

const app = new Koa();
const PORT_NUMBER = 3000;

(async () => {
  await sequelize.sync();
  app.use(cors({ origin: '*' }));

  const appRouter = new KoaRouter({
    prefix: '/api',
  });
  appRouter.use('', taskRouter.routes(), taskRouter.allowedMethods());

  app.use(json());
  app.use(logger());
  app.use(bodyParser());
  app.use(appRouter.routes()).use(appRouter.allowedMethods());

  app.listen(PORT_NUMBER, () => {
    console.log(`Koa server started at localhost:${PORT_NUMBER}`);
  });
})();
