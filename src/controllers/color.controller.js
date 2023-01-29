import { colorService } from '../services/color.service.js';
import { StatusCodes } from 'http-status-codes';

class ColorController {
  async create(req, res) {
    const { name } = req.body;
    const color = await colorService.create(name);
    res.status(StatusCodes.OK).json(color);
  }

  async readAll(req, res) {
    const colors = await colorService.readAll();
    res.status(StatusCodes.OK).json(colors);
  }

  async readById(req, res) {
    const { colorId } = req.params;
    const color = await colorService.readById(colorId);
    res.status(StatusCodes.OK).json(color);
  }

  async readByName(req, res) {
    const { colorName } = req.params;
    const color = await colorService.readByName(colorName);
    res.status(StatusCodes.OK).json(color);
  }

  async deleteById(req, res) {
    const { colorId } = req.params;
    const deletedColor = await colorService.delete(colorId);
    res.status(StatusCodes.OK).json(deletedColor);
  }

  async deleteByName(req, res) {
    const { colorName } = req.params;
    const deletedColor = await colorService.deleteByName(colorName);
    res.status(StatusCodes.OK).json(deletedColor);
  }
}

export const colorController = new ColorController();
