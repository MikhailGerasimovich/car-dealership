import { carRepository } from '../repositories/car.repository.js';
import { brandService } from './brand.service.js';
import { colorService } from './color.service.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { checkValue } from '../helpers/chackValue.js';

class CarService {
  async create(price, year, model, description, brandName, colorName) {
    let brand = await brandService.readByName(brandName);
    if (!brand) {
      brand = await brandService.create(brandName);
    }

    let color = await colorService.readByName(colorName);
    if (!color) {
      color = await colorService.create(colorName);
    }
    const carInfo = { price, year, model, description };
    const car = await carRepository.create(carInfo);
    await brandService.addBrandToCar(car, brand);
    await colorService.addColorToCar(car, color);
    return await this.readById(car.id);
  }

  async readAll() {
    const cars = await carRepository.readAll();
    return cars;
  }

  async readById(carId) {
    const car = await carRepository.readById(carId);
    if (!car) {
      throw new NotFoundError(`Car with id: ${carId} not found`);
    }
    return car;
  }

  async update(price, year, model, description, brandName, colorName, isSelected, isSold, carId) {
    const oldCar = await this.readById(carId);
    const newCar = {
      price: checkValue(price) ? price : oldCar.price,
      year: checkValue(year) ? year : oldCar.year,
      model: checkValue(model) ? model : oldCar.model,
      description: checkValue(description) ? description : oldCar.description,
      isSelected: checkValue(isSelected) ? isSelected : oldCar.isSelected,
      isSold: checkValue(isSold) ? isSold : oldCar.isSelected,
    };

    await carRepository.update(newCar, carId);

    const car = await this.readById(carId);

    let brand;
    if (brandName) {
      brand = await brandService.readByName(brandName);
      if (!brand) {
        brand = await brandService.create(brandName);
      }
      await brandService.addBrandToCar(car, brand);
    }

    let color;
    if (colorName) {
      color = await colorService.readByName(colorName);
      if (!color) {
        color = await colorService.create(colorName);
      }
      await colorService.addColorToCar(car, color);
    }

    return await this.readById(carId);
  }

  async delete(carId) {
    const deletedCar = await this.readById(carId);
    await carRepository.delete(carId);
    return deletedCar;
  }
}

export const carService = new CarService();
