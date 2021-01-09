import { TaskCreationAttributes } from '../database/models/task';

export interface TaskEditRequest {
  isDone?: boolean;
  taskText?: string;
}

export interface CreateTaskRequest extends TaskCreationAttributes {}
