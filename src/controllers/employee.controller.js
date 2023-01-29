import { employeeService } from '../services/employee.service.js';
import { StatusCodes } from 'http-status-codes';

class EmployeeController {
  async create(req, res) {
    const { userId } = req.params;
    const { fullname, phone, salary, confirmKey } = req.body;
    const employee = await employeeService.create(fullname, phone, salary, confirmKey, userId);
    res.status(StatusCodes.OK).json(employee);
  }

  async readAll(req, res) {
    const employees = await employeeService.readAll();
    res.status(StatusCodes.OK).json(employees);
  }

  async readByUserId(req, res) {
    const { userId } = req.payload;
    const employee = await employeeService.readByUserId(userId);
    res.status(StatusCodes.OK).json(employee);
  }

  async delete(req, res) {
    const { userId } = req.payload;
    const deletedEmployee = await employeeService.deleteByUserId(userId);
    res.status(StatusCodes.OK).json(deletedEmployee);
  }

  async deleteByAdmin(req, res) {
    const { employeeId } = req.params;
    const deletedEmployee = await employeeService.deleteByAdmin(employeeId);
    res.status(StatusCodes.OK).json(deletedEmployee);
  }

  async confirmSale(req, res) {
    //подтверждение покупки
    const { userId } = req.payload;
    const { saleId } = req.params;
    const confirmSale = await employeeService.confirmSale(userId, saleId);
    res.status(StatusCodes.OK).json(confirmSale);
  }

  async readAllConfirmSales(req, res) {
    const { userId } = req.payload;
    const confirmSales = await employeeService.readAllConfirmSales(userId);
    res.status(StatusCodes.OK).json(confirmSales);
  }
}

export const employeeController = new EmployeeController();
