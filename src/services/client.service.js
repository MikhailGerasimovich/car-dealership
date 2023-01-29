import { clientRepository } from '../repositories/client.repository.js';
import { userService } from './user.service.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import { env } from '../env.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { carService } from './car.service.js';
import { saleService } from './sale.service.js';
import { carRepository } from '../repositories/car.repository.js';

class ClientService {
  async create(fullname, phone, email, userId) {
    const hasClient = await this.readByUserId(userId);
    if (hasClient) {
      throw new BadRequestError('attempt to re-create the client');
    }

    const user = await userService.readById(userId);
    const userRole = env.roles.userRole;
    if (!(await userService.hasRole(user, userRole))) {
      throw new BadRequestError('this user does not have the necessary rights');
    }
    const clientInfo = { fullname, phone, email };
    const client = await clientRepository.create(clientInfo);
    await userService.addClientToUser(user, client);
    return client;
  }

  async readAll() {
    return await clientRepository.readAll();
  }

  async readById(clientId) {
    const client = await clientRepository.readById(clientId);
    if (!client) {
      throw new NotFoundError(`Client with id: ${clientId} not found`);
    }
    return client;
  }

  async readByUserId(userId) {
    const client = await clientRepository.readByUserId(userId);
    return client;
  }

  async deleteByUserId(userId) {
    //delete by userId, which took from payload
    const deletedClient = await clientService.readByUserId(userId);
    if (!deletedClient) {
      throw new NotFoundError(`Client with user id: ${userId} not found`);
    }
    await clientRepository.delete(deletedClient.id);
    return deletedClient;
  }

  async deleteByAdmin(clientId) {
    const deletedClient = await clientService.readById(clientId);
    if (!deletedClient) {
      throw new BadRequestError(`client with id: ${clientId} does not exist`);
    }
    if (deletedClient.userId) {
      throw new BadRequestError(`there is a user for the client with id: ${clientId}`);
    }
    await clientRepository.delete(clientId);
    return deletedClient;
  }

  async selectCar(userId, carId) {
    const client = await this.readByUserId(userId);
    if (!client) {
      throw new NotFoundError(`Client with user id: ${userId} not found`);
    }
    const car = await carService.readById(carId);
    if (car.isSold) {
      throw new BadRequestError(`you cannot select this car with id: ${carId}, because he is already sold`);
    }
    if (car.isSelected) {
      throw new BadRequestError(`you cannot select this car with id: ${carId}, because he is already selected`);
    }
    await carRepository.update({ isSelected: true }, carId);
    const sale = await saleService.create(client.id, car.id);
    const createdSale = await saleService.readById(sale.id);
    return createdSale;
  }

  async deleteSelectCar(userId, carId) {
    const client = await this.readByUserId(userId);
    if (!client) {
      throw new NotFoundError(`Client with user id: ${userId} not found`);
    }
    const car = await carService.readById(carId);
    if (car.isSold) {
      throw new BadRequestError(`Car with id: ${carId} is already sold`);
    }

    const sale = await saleService.readByClientIdAndCarId(client.id, carId);
    await saleService.delete(sale.id);
    await carRepository.update({ isSelected: false }, carId);
    return sale;
  }

  async readAllSelectedCars(userId) {
    const client = await this.readByUserId(userId);
    if (!client) {
      throw new NotFoundError(`Client with user id: ${userId} not found`);
    }
    const selectedCars = await clientRepository.readAllSelectedCars(client.id);
    return selectedCars;
  }

  async readAllPurchasedCars(userId) {
    const client = await this.readByUserId(userId);
    if (!client) {
      throw new NotFoundError(`Client with user id: ${userId} not found`);
    }
    const purchasedCars = await clientRepository.readAllPurchasedCars(client.id);
    return purchasedCars;
  }
}

export const clientService = new ClientService();
