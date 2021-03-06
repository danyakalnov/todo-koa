import { Task } from '../database/models/task';
import { Context, Next } from 'koa';
import { CreateTaskRequest, TaskEditRequest } from '../types/request';

export const getTasks: (ctx: Context, next: Next) => Promise<void> = async (
  ctx: Context,
  next: Next,
): Promise<void> => {
  try {
    const tasks = await Task.findAll({
      order: [
        ['isDone', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    });
    ctx.status = 200;
    ctx.body = tasks;
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: 'Internal server error',
    };
  } finally {
    await next();
  }
};

export const getTask: (ctx: Context, next: Next) => Promise<void> = async (
  ctx: Context,
  next: Next,
): Promise<void> => {
  try {
    const taskId = ctx.params.id;
    const task = await Task.findByPk(taskId);

    if (task !== null) {
      ctx.status = 200;
      ctx.body = task;
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
  } finally {
    await next();
  }
};

export const createTask: (ctx: Context, next: Next) => Promise<void> = async (
  ctx: Context,
  next: Next,
): Promise<void> => {
  try {
    const newTaskData = <CreateTaskRequest>ctx.request.body;
    const newTask = await Task.build({
      ...newTaskData,
      isDone: false,
    });

    await newTask.save();

    ctx.status = 201;
    ctx.body = {
      id: newTask.id,
    };
  } catch (error) {
    console.log('Error occurred while creating new task');
  } finally {
    await next();
  }
};

export const toggleTask: (ctx: Context, next: Next) => Promise<void> = async (
  ctx: Context,
  next: Next,
): Promise<void> => {
  try {
    const taskToToggleId = ctx.params.id;
    const taskToToggle = await Task.findByPk(taskToToggleId);

    if (taskToToggle !== null) {
      const newTaskStatus: boolean = !taskToToggle.isDone;
      taskToToggle.isDone = newTaskStatus;
      await taskToToggle.save();

      ctx.status = 200;
      ctx.body = {
        id: taskToToggle.id,
        isDone: newTaskStatus,
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        message: `Task with id: ${taskToToggleId} does not exist`,
      };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: 'Internal server error',
    };
  } finally {
    await next();
  }
};

export const editTask: (ctx: Context, next: Next) => Promise<void> = async (
  ctx: Context,
  next: Next,
): Promise<void> => {
  try {
    const taskToEditId = ctx.params.id;
    const taskToEdit = await Task.findByPk(taskToEditId);

    const newTaskData = <TaskEditRequest>ctx.request.body;

    if (taskToEdit !== null) {
      if (newTaskData.isDone) taskToEdit.isDone = newTaskData.isDone;
      if (newTaskData.taskText) taskToEdit.taskText = newTaskData.taskText;

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
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: 'Internal server error',
    };
  } finally {
    await next();
  }
};

export const deleteTask: (ctx: Context, next: Next) => Promise<void> = async (
  ctx: Context,
  next: Next,
): Promise<void> => {
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
  } finally {
    await next();
  }
};
