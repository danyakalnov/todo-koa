import { Sequelize } from 'sequelize';

export const sequelize: Sequelize = new Sequelize('web_task', 'web_task', 'h647Gf46VnmQo95jhMo', {
  host: 'localhost',
  port: 5433,
  dialect: 'postgres',
});
