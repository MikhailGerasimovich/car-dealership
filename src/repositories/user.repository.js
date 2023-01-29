import { db } from '../db/db.js';

class UserRepository {
  async create(user) {
    return await db.User.create(user);
  }

  async readAll() {
    return await db.User.findAll({
      as: 'user',
      attributes: ['id', 'login'],
      include: {
        model: db.Role,
        as: 'role',
        attributes: ['name'],
        through: {
          attributes: [], //чтобы не выводило не нухных атрибутов промежуточной таблицы
        },
      },
    });
  }

  async readById(id) {
    return await db.User.findOne({
      where: { id },
      as: 'user',
      attributes: ['id', 'login', 'password'],
    });
  }

  async readByLogin(login) {
    return await db.User.findOne({
      where: { login },
      as: 'user',
      attributes: ['id', 'login', 'password'],
    });
  }

  async update(newUser, id) {
    await db.User.update(newUser, { where: { id } });
  }

  async delete(id) {
    await db.User.destroy({ where: { id } });
  }

  async addClientToUser(user, client) {
    await user.setClient(client);
  }

  async addEmployeeToUser(user, employee) {
    await user.setEmployee(employee);
  }

  async hasRole(user, role) {
    return await user.hasRole(role);
  }
}

export const userRepository = new UserRepository();
