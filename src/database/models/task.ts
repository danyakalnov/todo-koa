import { DataTypes } from 'sequelize';
import { sequelize } from '../setup';

export const Task = sequelize.define(
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
