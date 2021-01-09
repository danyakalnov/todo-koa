import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../setup';

export interface TaskAttributes {
  id: number;
  taskText: string;
  isDone: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'isDone'> {}

interface TaskInstance extends Model<TaskAttributes, TaskCreationAttributes>, TaskAttributes {}

export const Task = sequelize.define<TaskInstance>(
  'Task',
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    taskText: {
      type: DataTypes.STRING,
      field: 'task',
      defaultValue: 'Задание',
      allowNull: false,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      field: 'is_done',
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: 'tasks',
  },
);
