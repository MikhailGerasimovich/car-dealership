import { Sequelize } from 'sequelize';
import { sequelize } from './connection.js';
import * as model from '../models/index.js';

export const db = {
  Sequelize: Sequelize,
  sequelize,
  User: model.getUserModel(sequelize),
  Role: model.getRoleModel(sequelize),
  Client: model.getClientModel(sequelize),
  Employee: model.getEmployeeModel(sequelize),
  Brand: model.getBrandModel(sequelize),
  Color: model.getColorModel(sequelize),
  Car: model.getCarModel(sequelize),
  Sale: model.getSaleModel(sequelize),
};

export const createAssociations = async () => {
  db.User.associate(db);
  db.Role.associate(db);
  db.Client.associate(db);
  db.Employee.associate(db);
  db.Brand.associate(db);
  db.Color.associate(db);
  db.Car.associate(db);
  db.Sale.associate(db);
};
