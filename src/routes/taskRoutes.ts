import * as KoaRouter from 'koa-router';
import { getTasks, getTask, editTask, createTask, deleteTask } from '../services/taskService';

export const taskRouter = new KoaRouter({
  prefix: '/tasks',
});

taskRouter.get('/', getTasks);
taskRouter.get('/:id', getTask);
taskRouter.patch('/:id', editTask);
taskRouter.post('/create', createTask);
taskRouter.delete('/:id', deleteTask);
