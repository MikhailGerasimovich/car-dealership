import { userService } from './user.service.js';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../helpers/generateAccessToken.js';
import { BadRequestError } from '../errors/BadRequestError.js';

class LoginService {
  async login(login, password) {
    const user = await userService.readByLogin(login);
    if (!user) {
      throw new BadRequestError(`User with login: '${login}' does not exist`);
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      throw new BadRequestError(`Wrong password`);
    }

    const token = generateAccessToken(user.id, await user.getRole());
    return token;
  }
}

export const loginService = new LoginService();
