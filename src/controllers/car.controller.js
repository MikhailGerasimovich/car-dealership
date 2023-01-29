import { carService } from '../services/car.service.js';
import { StatusCodes } from 'http-status-codes';
import { requestValidation } from '../helpers/requestValidation.js';

class CarController {
  async create(req, res) {
    requestValidation(req);
    const { price, year, model, description, brand, color } = req.body;
    const car = await carService.create(price, year, model, description, brand, color);
    res.status(StatusCodes.OK).json(car);
  }

  async readAll(req, res) {
    const cars = await carService.readAll();
    res.status(StatusCodes.OK).json(cars);
  }

  async readById(req, res) {
    const { carId } = req.params;
    const car = await carService.readById(carId);
    res.status(StatusCodes.OK).json(car);
  }

  async update(req, res) {
    const { carId } = req.params;
    const { price, year, model, description, brand, color, isSelected, isSold } = req.body;
    const updatedCar = await carService.update(
      price,
      year,
      model,
      description,
      brand,
      color,
      isSelected,
      isSold,
      carId,
    );
    res.status(StatusCodes.OK).json(updatedCar);
  }

  async delete(req, res) {
    const { carId } = req.params;
    const deletedCar = await carService.delete(carId);
    res.status(StatusCodes.OK).json(deletedCar);
  }
}

export const carController = new CarController();
