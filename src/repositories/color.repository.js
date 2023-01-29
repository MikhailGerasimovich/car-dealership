import { db } from '../db/db.js';

class ColorRepository {
  async create(color) {
    return db.Color.create(color);
  }

  async readAll() {
    return await db.Color.findAll({
      as: 'color',
      attributes: ['id', 'name'],
    });
  }

  async readById(id) {
    return await db.Color.findOne({
      where: { id },
      as: 'color',
      attributes: ['id', 'name'],
    });
  }

  async readByName(name) {
    return await db.Color.findOne({
      where: { name },
      as: 'color',
      attributes: ['id', 'name'],
    });
  }

  async update(newColor, id) {
    await db.Color.update(newColor, { where: { id } });
  }

  async delete(id) {
    await db.Color.destroy({ where: { id } });
  }

  async deleteByName(name) {
    await db.Color.destroy({ where: { name } });
  }

  async addColorToCar(car, color) {
    await car.setColor(color);
  }
}

export const colorRepository = new ColorRepository();
