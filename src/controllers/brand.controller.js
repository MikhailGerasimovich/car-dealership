import { StatusCodes } from 'http-status-codes';
import { brandService } from '../services/brand.service.js';

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await brandService.create(name);
    res.status(StatusCodes.OK).json(brand);
  }

  async readAll(req, res) {
    const brands = await brandService.readAll();
    res.status(StatusCodes.OK).json(brands);
  }

  async readById(req, res) {
    const { brandId } = req.params;
    const brand = await brandService.readById(brandId);
    res.status(StatusCodes.OK).json(brand);
  }

  async deleteById(req, res) {
    const { brandId } = req.params;
    const deletedBrand = await brandService.delete(brandId);
    res.status(StatusCodes.OK).json(deletedBrand);
  }

  async deleteByName(req, res) {
    const { name } = req.params;
    const deletedBrand = await brandService.deleteByName(name);
    res.status(StatusCodes.OK).json(deletedBrand);
  }
}

export const brandController = new BrandController();
