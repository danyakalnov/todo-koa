import * as koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import { taskRouter } from './routes/taskRoutes';

const app = new koa();
const PORT_NUMBER = 3000;

app.use(json());
app.use(logger());
app.use(taskRouter.routes()).use(taskRouter.allowedMethods());

app.listen(PORT_NUMBER);
