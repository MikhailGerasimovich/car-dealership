import { colorRepository } from '../repositories/color.repository.js';

class ColorService {
  async create(name) {
    const color = { name: name.toLowerCase() };
    return await colorRepository.create(color);
  }

  async readAll() {
    return await colorRepository.readAll();
  }

  async readById(id) {
    return colorRepository.readById(id);
  }

  async readByName(name) {
    return await colorRepository.readByName(name.toLowerCase());
  }

  async delete(id) {
    const deletedColor = await this.readById(id);
    await colorRepository.delete(id);
    return deletedColor;
  }

  async deleteByName(name) {
    const deletedColor = await this.readByName(name);
    await colorRepository.deleteByName(name);
    return deletedColor;
  }

  async addColorToCar(car, color) {
    await colorRepository.addColorToCar(car, color);
  }
}

export const colorService = new ColorService();
