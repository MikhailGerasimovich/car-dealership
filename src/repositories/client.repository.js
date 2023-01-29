import { db } from '../db/db.js';
import { Op } from 'sequelize';

class ClientRepository {
  async create(client) {
    return await db.Client.create(client);
  }

  async readAll() {
    return await db.Client.findAll({
      attributes: ['id', 'fullname', 'phone', 'email', 'userId'],
      as: 'client',
      include: {
        model: db.User,
        as: 'user',
        attributes: ['id', 'login'],
      },
    });
  }

  async readById(id) {
    return await db.Client.findOne({
      where: { id },
      attributes: ['id', 'fullname', 'phone', 'email', 'userId'],
      as: 'client',
    });
  }

  async readByUserId(userId) {
    return await db.Client.findOne({
      where: { userId },
      attributes: ['id', 'fullname', 'phone', 'email', 'userId'],
      as: 'client',
      include: {
        model: db.User,
        as: 'user',
        attributes: ['id', 'login'],
      },
    });
  }

  async delete(id) {
    await db.Client.destroy({ where: { id } });
  }

  async readAllSelectedCars(clientId) {
    return db.Car.findAll({
      attributes: ['id', 'price', 'year', 'model', 'description', 'isSelected', 'isSold'],
      as: 'car',
      include: [
        {
          model: db.Sale,
          attributes: [],
          as: 'sale',
          where: { clientId },
        },
        {
          model: db.Brand,
          attributes: ['id', 'name'],
          as: 'brand',
        },
        {
          model: db.Color,
          attributes: ['id', 'name'],
          as: 'color',
        },
      ],
    });
  }

  async readAllPurchasedCars(clientId) {
    return await db.Sale.findAll({
      where: {
        clientId,
        employeeId: {
          [Op.ne]: null,
        },
        saleConfirm: {
          [Op.ne]: null,
        },
      },
      attributes: ['id', 'saleDate', 'saleConfirm'],
      as: 'sale',
      include: [
        {
          model: db.Car,
          attributes: ['id', 'price', 'year', 'model', 'description', 'isSelected', 'isSold'],
          as: 'car',
          include: [
            {
              model: db.Brand,
              attributes: ['id', 'name'],
              as: 'brand',
            },
            {
              model: db.Color,
              attributes: ['id', 'name'],
              as: 'color',
            },
          ],
        },
        {
          model: db.Employee,
          attributes: ['id', 'fullname', 'phone'],
          as: 'employee',
        },
      ],
    });
  }
}

export const clientRepository = new ClientRepository();
