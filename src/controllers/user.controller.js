import { userService } from '../services/user.service.js';
import { StatusCodes } from 'http-status-codes';
import { requestValidation } from '../helpers/requestValidation.js';

class UserController {
  async readAll(req, res) {
    const users = await userService.readAll();
    res.status(StatusCodes.OK).json(users);
  }

  async readById(req, res) {
    const { userId } = req.payload;
    const user = await userService.readById(userId);
    res.status(StatusCodes.OK).json(user);
  }

  async update(req, res) {
    //простое обновление, пароль так тоже можно обновить но он будет захеширован и на него так же будут наложены проверки валидации
    requestValidation(req);
    const { userId } = req.payload;
    const { login, password } = req.body;
    const updatedUser = await userService.update(login, password, userId);
    res.status(StatusCodes.OK).json(updatedUser);
  }

  async updateLogin(req, res) {
    requestValidation(req);
    const { userId } = req.payload;
    const { login } = req.body;
    const updatedUser = await userService.updateLogin(login, userId);
    res.status(StatusCodes.OK).json(updatedUser);
  }

  async updatePassword(req, res) {
    requestValidation(req);
    const { userId } = req.payload;
    const { password } = req.body;
    const updatedUser = await userService.updatePassword(password, userId);
    res.status(StatusCodes.OK).json(updatedUser);
  }

  async delete(req, res) {
    //удаление своего аккаунта пользователя//аккаунт админа удалить нельзя
    const { userId } = req.payload;
    const deletedUser = await userService.delete(userId);
    res.status(StatusCodes.OK).json(deletedUser);
  }

  async deleteByAdmin(req, res) {
    //удаление пользователей администратором(админ не сможет удалить сам себя)
    const { userId } = req.params;
    const deletedUser = await userService.delete(userId);
    res.status(StatusCodes.OK).json(deletedUser);
  }
}

export const userController = new UserController();
