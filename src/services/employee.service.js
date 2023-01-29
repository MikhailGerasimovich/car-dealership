import { employeeRepository } from '../repositories/employee.repository.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import { userService } from './user.service.js';
import { env } from '../env.js';
import { saleService } from './sale.service.js';
import { saleRepository } from '../repositories/sale.repository.js';
import { carRepository } from '../repositories/car.repository.js';

class EmployeeService {
  async create(fullname, phone, salary, confirmKey, userId) {
    const hasEmployee = await this.readByUserId(userId);
    if (hasEmployee) {
      throw new BadRequestError('attempt to re-create the employee');
    }

    const user = await userService.readById(userId);
    const managerRole = env.roles.managerRole;
    const hasRole = await userService.hasRole(user, managerRole);
    if (!hasRole) {
      throw new BadRequestError(`user with id: ${userId} does not have the necessary rights`);
    }
    const employeeInfo = {
      fullname,
      phone,
      salary,
      confirmKey,
    };
    const employee = await employeeRepository.create(employeeInfo);
    await userService.addEmployeeToUser(user, employee);
    return employee;
  }

  async readAll() {
    const sales = await employeeRepository.readAll();
    return sales;
  }

  async readById(employeeId) {
    const employee = await employeeRepository.readById(employeeId);
    return employee;
  }

  async readByUserId(userId) {
    const employee = await employeeRepository.readByUserId(userId);
    return employee;
  }

  async deleteByAdmin(employeeId) {
    const deletedEmployee = await employeeService.readById(employeeId);
    if (!deletedEmployee) {
      throw new BadRequestError(`employee with id: ${employeeId} does not exist`);
    }
    if (deletedEmployee.userId) {
      throw new BadRequestError(`there is a user for the employee with id: ${employeeId}`);
    }
    await employeeRepository.delete(employeeId);
    return deletedEmployee;
  }

  async deleteByUserId(userId) {
    const deletedEmployee = await employeeService.readByUserId(userId);
    if (!deletedEmployee) {
      throw new BadRequestError(`For user with id: ${userId} does not exist employee`);
    }
    await employeeRepository.delete(deletedEmployee.id);
    return deletedEmployee;
  }

  async confirmSale(userId, saleId) {
    const sale = await saleService.readById(saleId);
    if (sale.employeeId || sale.saleConfirm || sale.saleDate) {
      throw new BadRequestError(`Sale with id: ${saleId} is not correct`);
    }
    const employee = await this.readByUserId(userId);
    await saleRepository.update(
      {
        employeeId: employee.id,
        saleConfirm: employee.confirmKey,
        saleDate: new Date(),
      },
      saleId,
    );

    await employeeRepository.update({ numberSoldCars: employee.numberSoldCars + 1 }, employee.id);
    await carRepository.update({ isSold: true }, sale.carId);
    const confirmSale = await saleService.readById(saleId);
    return confirmSale;
  }

  async readAllConfirmSales(userId) {
    const employee = await this.readByUserId(userId);
    if (!employee) {
      throw new BadRequestError(`For user with id: ${userId} does not exist employee`);
    }
    const confirmSales = await employeeRepository.readAllConfirmSales(employee.id);
    return confirmSales;
  }
}

export const employeeService = new EmployeeService();
