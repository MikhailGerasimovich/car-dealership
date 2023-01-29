import { db } from '../db/db.js';
import { Op } from 'sequelize';

class EmployeeRepository {
  async create(employee) {
    return await db.Employee.create(employee);
  }

  async readAll() {
    return await db.Employee.findAll({
      attributes: ['id', 'fullname', 'phone', 'startWorkDate', 'salary', 'numberSoldCars', 'confirmKey', 'userId'],
      as: 'employee',
      include: {
        model: db.User,
        as: 'user',
        attributes: ['id', 'login'],
      },
    });
  }

  async readById(id) {
    return await db.Employee.findOne({
      where: { id },
      attributes: ['id', 'fullname', 'phone', 'startWorkDate', 'salary', 'numberSoldCars', 'confirmKey', 'userId'],
      as: 'employee',
      include: {
        model: db.User,
        as: 'user',
        attributes: ['id', 'login'],
      },
    });
  }

  async readByUserId(userId) {
    return await db.Employee.findOne({
      where: { userId },
      attributes: ['id', 'fullname', 'phone', 'startWorkDate', 'salary', 'numberSoldCars', 'confirmKey', 'userId'],
      as: 'employee',
      include: {
        model: db.User,
        as: 'user',
        attributes: ['id', 'login'],
      },
    });
  }

  async readAllConfirmSales(employeeId) {
    return await db.Sale.findAll({
      where: {
        employeeId,
        [Op.and]: [
          {
            saleConfirm: {
              [Op.ne]: null,
            },
          },
          {
            saleDate: {
              [Op.ne]: null,
            },
          },
        ],
      },
      attributes: ['id', 'saleDate', 'saleConfirm'],
      as: 'sale',
      include: [
        {
          model: db.Client,
          attributes: ['id', 'fullname', 'phone', 'email'],
          as: 'client',
        },
        {
          model: db.Car,
          where: {
            [Op.and]: [{ isSelected: true }, { isSold: true }],
          },
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
          attributes: ['fullname', 'phone'],
          as: 'employee',
        },
      ],
    });
  }

  async update(employee, employeeId) {
    await db.Employee.update(employee, { where: { id: employeeId } });
  }

  async delete(id) {
    await db.Employee.destroy({ where: { id } });
  }
}

export const employeeRepository = new EmployeeRepository();
