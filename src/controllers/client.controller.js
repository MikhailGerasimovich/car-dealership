import { clientService } from '../services/client.service.js';
import { StatusCodes } from 'http-status-codes';
import { requestValidation } from '../helpers/requestValidation.js';

class ClientController {
  async create(req, res) {
    requestValidation(req);
    const { userId } = req.payload;
    const { fullname, phone, email } = req.body;
    const client = await clientService.create(fullname, phone, email, userId);
    res.status(StatusCodes.OK).json(client);
  }

  async readByUserId(req, res) {
    const { userId } = req.payload;
    const client = await clientService.readByUserId(userId);
    res.status(StatusCodes.OK).json(client);
  }

  async deleteByUserId(req, res) {
    const { userId } = req.payload;
    const deletedClient = await clientService.deleteByUserId(userId);
    res.status(StatusCodes.OK).json(deletedClient);
  }

  async readAllByAdmin(req, res) {
    const clients = await clientService.readAll();
    res.status(StatusCodes.OK).json(clients);
  }

  async readByAdminByClientId(req, res) {
    const { clientId } = req.params;
    const client = await clientService.readById(clientId);
    res.status(StatusCodes.OK).json(client);
  }

  async deleteByAdmin(req, res) {
    const { clientId } = req.params;
    const deletedClient = await clientService.deleteByAdmin(clientId);
    res.status(StatusCodes.OK).json(deletedClient);
  }

  async selectCar(req, res) {
    //выбрать машину для покупки
    const { userId } = req.payload;
    const { carId } = req.params;
    const selectedCar = await clientService.selectCar(userId, carId);
    res.status(StatusCodes.OK).json(selectedCar);
  }

  async deleteSelectedCar(req, res) {
    const { userId } = req.payload;
    const { carId } = req.params;
    const deletedSelectCar = await clientService.deleteSelectCar(userId, carId);
    res.status(StatusCodes.OK).json(deletedSelectCar);
  }

  async readAllSelectedCars(req, res) {
    //посмотреть список всех выбраных машин
    const { userId } = req.payload;
    const selectedCars = await clientService.readAllSelectedCars(userId);
    res.status(StatusCodes.OK).json(selectedCars);
  }

  async readAllPurchasedCars(req, res) {
    //посмотреть список всех купленных машин
    const { userId } = req.payload;
    const purchasedCars = await clientService.readAllPurchasedCars(userId);
    res.status(StatusCodes.OK).json(purchasedCars);
  }
}

export const clientController = new ClientController();
