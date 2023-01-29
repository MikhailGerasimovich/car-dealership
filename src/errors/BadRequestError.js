import { BaseError } from './BaseError.js';
import { StatusCodes } from 'http-status-codes';

export class BadRequestError extends BaseError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.name = 'BAD REQUEST';
  }
}
