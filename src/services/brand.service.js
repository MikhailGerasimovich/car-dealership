import { brandRepository } from '../repositories/brand.repository.js';

class BrandService {
  async create(name) {
    const brand = { name: name.toLowerCase() };
    return await brandRepository.create(brand);
  }

  async readAll() {
    return await brandRepository.readAll();
  }

  async readById(id) {
    return brandRepository.readById(id);
  }

  async readByName(name) {
    return await brandRepository.readByName(name.toLowerCase());
  }

  async delete(id) {
    const deletedBrand = await this.readById(id);
    await brandRepository.delete(id);
    return deletedBrand;
  }

  async deleteByName(name) {
    const deletedBrand = await this.readByName(name);
    await brandRepository.deleteByName(name);
    return deletedBrand;
  }

  async addBrandToCar(car, brand) {
    await brandRepository.addBrandToCar(car, brand);
  }
}

export const brandService = new BrandService();
