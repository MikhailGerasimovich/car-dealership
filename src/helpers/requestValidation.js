import { validationResult, check } from 'express-validator';
import { ValidationError } from '../errors/ValidationError.js';
import { NOT_VALID } from './constants/validation.js';

export function requestValidation(request) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    const errorsMsg = errors.errors.map((e) => e.msg);
    throw new ValidationError(errorsMsg);
  }
}

export const loginValidation = check('login').notEmpty().withMessage(NOT_VALID.LOGIN);

export const passwordValidation = check('password')
  .notEmpty()
  .isLength({ min: 4, max: 10 })
  .withMessage(NOT_VALID.PASSWORD);

export const emailValidation = check('email').isEmail().withMessage(NOT_VALID.EMAIL);

export const carInfoValidation = [
  check('price').isFloat().notEmpty().withMessage(NOT_VALID.CAR_PRICE),

  check('year').isInt().notEmpty().withMessage(NOT_VALID.CAR_YEAR),

  check('model').notEmpty().withMessage(NOT_VALID.CAR_MODEL),

  check('description').notEmpty().withMessage(NOT_VALID.CAR_DESCRIPTION),

  check('brand').notEmpty().withMessage(NOT_VALID.CAR_BRAND),

  check('color').notEmpty().withMessage(NOT_VALID.CAR_COLOR),
];
