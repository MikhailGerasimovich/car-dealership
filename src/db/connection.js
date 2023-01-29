import { Sequelize } from 'sequelize';
import { env } from '../env.js';

export const sequelize = new Sequelize(env.dataBase.dbName, env.dataBase.userName, env.dataBase.password, {
  host: env.dataBase.host,
  port: env.dataBase.port,
  dialect: env.dataBase.dialect,
  // operatorsAliases: true,//was false
  logging: console.log, //по умолчанию будет логировать запросы, отключаем это а после это можно будет настроить
  define: {
    timestamps: false, //отключу временные метки в таблицах бд
  },
});
