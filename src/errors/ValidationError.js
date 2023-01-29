import { BaseError } from './BaseError.js';
import { StatusCodes } from 'http-status-codes';

export class ValidationError extends BaseError {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.name = 'Validation Error';
  }
}
