import { Task } from '../database/models/task';
import { Context, Next } from 'koa';

export const getTasks = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const tasks = await Task.findAll();
    ctx.status = 200;
    ctx.body = tasks;

    await next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: 'Internal server error',
    };
  }
};

export const getTask = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const taskId = ctx.params.id;
    const task = await Task.findByPk(taskId);

    if (task !== null) {
      ctx.status = 200;
      ctx.body = task;
      await next();
    } else {
      ctx.status = 404;
      ctx.body = {
        message: `Task with id: ${taskId} does not exist`,
      };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: 'Internal server error',
    };
  }
};

export const createTask = async (ctx: Context, next: Next): Promise<void> => {
  const newTask = await Task.create({
    ...ctx.request.body,
    isDone: 'false',
  });

  ctx.status = 201;
  ctx.body = {
    id: newTask.id,
  };

  await next();
};

export const editTask = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const taskToEditId = ctx.params.id;
    const taskToEdit = await Task.findByPk(taskToEditId);

    if (taskToEdit !== null) {
      taskToEdit.isDone = ctx.request.body.isDone;
      taskToEdit.taskText = ctx.request.body.taskText;

      await taskToEdit.save();
      ctx.status = 200;
      ctx.body = {
        message: `Task ${taskToEditId} was successfully updated`,
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        message: `Task with id: ${taskToEditId} does not exist`,
      };
    }

    await next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: 'Internal server error',
    };
  }
};

export const deleteTask = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const taskToDeleteId = ctx.params.id;
    const taskDeletionResult = await Task.destroy({
      where: {
        id: taskToDeleteId,
      },
    });
    if (taskDeletionResult === 1) {
      ctx.status = 200;
      ctx.body = {
        message: `Task with id ${taskToDeleteId} was successfully deleted`,
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        message: `Can not delete task with such id: ${taskToDeleteId}`,
      };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: 'Internal server error',
    };
  }
};
