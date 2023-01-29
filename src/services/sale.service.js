import { saleRepository } from '../repositories/sale.repository.js';
import { NotFoundError } from '../errors/NotFoundError.js';

class SaleService {
  async create(clientId, carId) {
    const saleInfo = { clientId, carId };
    const sale = await saleRepository.create(saleInfo);
    return sale;
  }

  async readAll() {
    return await saleRepository.readAll();
  }

  async readAllSelectedSales() {
    const selectedSales = await saleRepository.readAllSelectedSales();
    return selectedSales;
  }

  async readAllConfirmedSales() {
    const confirmedSales = await saleRepository.readAllConfirmedSales();
    return confirmedSales;
  }

  async readById(saleId) {
    const sale = await saleRepository.readById(saleId);
    if (!sale) {
      throw new NotFoundError(`sale with id: ${saleId} not found`);
    }
    return sale;
  }

  async readByClientIdAndCarId(clientId, carId) {
    const sale = await saleRepository.readByClientIdAndCarId(clientId, carId);
    if (!sale) {
      throw new NotFoundError(`Sale with clientId: ${clientId} and carId: ${carId} does not exist`);
    }
    return sale;
  }

  async update(saleDate, saleConfirm, id) {
    const newSale = { saleDate, saleConfirm };
    await saleRepository.update(newSale, id);
    return await this.readById(id);
  }

  async delete(id) {
    const deletedSale = await this.readById(id);
    await saleRepository.delete(id);
    return deletedSale;
  }
}

export const saleService = new SaleService();
