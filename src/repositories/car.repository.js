import { db } from '../db/db.js';

class CarRepository {
  async create(car) {
    return await db.Car.create(car);
  }

  async readAll() {
    return await db.Car.findAll({
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
    });
  }

  async readById(id) {
    return await db.Car.findOne({
      where: { id },
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
    });
  }

  async update(car, id) {
    await db.Car.update(car, { where: { id } });
  }

  async delete(id) {
    await db.Car.destroy({ where: { id } });
  }
}

export const carRepository = new CarRepository();
