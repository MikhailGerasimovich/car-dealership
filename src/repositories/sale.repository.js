import { db } from '../db/db.js';
import { Op } from 'sequelize';

class SaleRepository {
  async create(sale) {
    return await db.Sale.create(sale);
  }

  async readAll() {
    return await db.Sale.findAll({
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

  async readById(id) {
    return await db.Sale.findOne({
      where: { id },
      attributes: ['id', 'saleDate', 'saleConfirm', 'clientId', 'employeeId', 'carId'],
      as: 'sale',
      include: [
        {
          model: db.Client,
          attributes: ['id', 'fullname', 'phone', 'email'],
          as: 'client',
        },
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
          attributes: ['fullname', 'phone'],
          as: 'employee',
        },
      ],
    });
  }

  async readByClientIdAndCarId(clientId, carId) {
    return await db.Sale.findOne({
      where: { clientId, carId },
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

  async readAllSelectedSales() {
    return await db.Sale.findAll({
      where: {
        [Op.and]: [{ saleConfirm: null }, { saleDate: null }],
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
            [Op.and]: [{ isSelected: true }, { isSold: false }],
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

  async readAllConfirmedSales() {
    return await db.Sale.findAll({
      where: {
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

  async update(newSale, id) {
    await db.Sale.update(newSale, { where: { id } });
  }

  async delete(id) {
    await db.Sale.destroy({ where: { id } });
  }
}

export const saleRepository = new SaleRepository();
