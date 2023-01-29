import { saleService } from '../services/sale.service.js';
import { StatusCodes } from 'http-status-codes';

class SaleController {
  async readAll(req, res) {
    const sales = await saleService.readAll();
    res.status(StatusCodes.OK).json(sales);
  }

  async readAllSelectedSales(req, res) {
    const selectedSales = await saleService.readAllSelectedSales();
    res.status(StatusCodes.OK).json(selectedSales);
  }

  async readAllConfirmedSales(req, res) {
    const confirmedSales = await saleService.readAllConfirmedSales();
    res.status(StatusCodes.OK).json(confirmedSales);
  }

  async readById(req, res) {
    const { saleId } = req.params;
    const sale = await saleService.readById(saleId);
    res.status(StatusCodes.OK).json(sale);
  }
}

export const saleController = new SaleController();
