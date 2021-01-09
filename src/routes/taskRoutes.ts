import * as koaRouter from 'koa-router';
import { getTasks, getTask, editTask, createTask, deleteTask } from '../services/taskService';

export const taskRouter = new koaRouter({
  prefix: '/tasks',
});

taskRouter.get('/', getTasks);
taskRouter.get('/:id', getTask);
taskRouter.patch('/:id', editTask);
taskRouter.post('/create', createTask);
taskRouter.delete('/:id', deleteTask);
