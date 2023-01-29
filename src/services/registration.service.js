import { userService } from './user.service.js';
import { roleService } from './role.service.js';
import { ConflictError } from '../errors/ConflictError.js';
import bcrypt from 'bcryptjs';

class RegistrationService {
  async registrationUser(login, password) {
    const candidate = await userService.readByLogin(login);
    if (candidate) {
      throw new ConflictError(`User with login: '${login}' already exists`);
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const user = await userService.create(login, hashPassword);
    const role = await roleService.readByName('USER');
    await roleService.addRoleToUser(user, role);
  }

  async registrationEmployee(login, password) {
    const candidate = await userService.readByLogin(login);
    if (candidate) {
      throw new ConflictError(`User with login: '${login}' already exists`);
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const employee = await userService.create(login, hashPassword);
    const role = await roleService.readByName('MANAGER');
    await roleService.addRoleToUser(employee, role);
  }
}

export const registrationService = new RegistrationService();
