import { registrationService } from '../services/registration.service.js';
import { loginService } from '../services/login.service.js';
import { requestValidation } from '../helpers/requestValidation.js';
import { StatusCodes } from 'http-status-codes';

class AuthController {
  async registrationUser(req, res) {
    requestValidation(req);
    const { login, password } = req.body;
    await registrationService.registrationUser(login, password);
    res.status(StatusCodes.CREATED).json({ message: 'Registration OK' });
  }

  async registrationEmployee(req, res) {
    requestValidation(req);
    const { login, password } = req.body;
    await registrationService.registrationEmployee(login, password);
    res.status(StatusCodes.CREATED).json({ message: 'Registration OK' });
  }

  async login(req, res) {
    //вход в систему
    const { login, password } = req.body;
    const token = await loginService.login(login, password);
    res.status(StatusCodes.OK).json({ token });
  }
}

export const authController = new AuthController();
