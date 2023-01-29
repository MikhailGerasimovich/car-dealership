import { db } from '../db/db.js';

class BrandRepository {
  async create(brand) {
    return db.Brand.create(brand);
  }

  async readAll() {
    return await db.Brand.findAll();
  }

  async readById(id) {
    return await db.Brand.findOne({ where: { id } });
  }

  async readByName(name) {
    return await db.Brand.findOne({ where: { name } });
  }

  async update(newBrand, id) {
    await db.Brand.update(newBrand, { where: { id } });
  }

  async delete(id) {
    await db.Brand.destroy({ where: { id } });
  }

  async deleteByName(name) {
    await db.Brand.destroy({ where: { name } });
  }

  async addBrandToCar(car, brand) {
    await car.setBrand(brand);
  }
}

export const brandRepository = new BrandRepository();
