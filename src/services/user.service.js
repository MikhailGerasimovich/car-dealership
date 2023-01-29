import { userRepository } from '../repositories/user.repository.js';
import { roleService } from './role.service.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import bcrypt from 'bcryptjs';
import { NotFoundError } from '../errors/NotFoundError.js';

class UserService {
  async create(login, password) {
    const user = { login, password };
    return await userRepository.create(user);
  }

  async readAll() {
    return await userRepository.readAll();
  }

  async readById(userId) {
    const user = await userRepository.readById(userId);
    if (!user) {
      throw new NotFoundError(`user with id: ${userId} not found`);
    }
    return user;
  }

  async readByLogin(login) {
    const user = await userRepository.readByLogin(login);
    return user;
  }

  async update(login, password, userId) {
    //в принципе работает чтобы обновить и логин в отдельности и пассворд в отдельности
    const hasUser = await userService.readByLogin(login);
    if (hasUser) {
      throw new BadRequestError(`user with login: ${login} already exist`);
    }
    const newUser = {
      login,
      password: bcrypt.hashSync(password, 7),
    };
    await userRepository.update(newUser, userId);
    const user = await this.readById(userId);
    return user;
  }

  async updateLogin(login, userId) {
    const hasUser = await userService.readByLogin(login);
    if (hasUser) {
      throw new BadRequestError(`user with login: ${login} already exist`);
    }
    await userRepository.update({ login }, userId);
    const user = await this.readById(userId);
    return user;
  }

  async updatePassword(password, userId) {
    await this.readById(userId);
    await userRepository.update({ password: bcrypt.hashSync(password, 7) }, userId);
    return await this.readById(userId);
  }

  async delete(userId) {
    const deletedUser = await this.readById(userId);
    if (deletedUser.login === 'admin') {
      throw new BadRequestError("you cannot take this action, can't delete admin account");
    }

    await userRepository.delete(userId);
    return deletedUser;
  }

  async addClientToUser(user, client) {
    await userRepository.addClientToUser(user, client);
  }

  async addEmployeeToUser(user, employee) {
    await userRepository.addEmployeeToUser(user, employee);
  }

  async hasRole(user, roleName) {
    const role = await roleService.readByName(roleName);
    return await userRepository.hasRole(user, role);
  }
}

export const userService = new UserService();
