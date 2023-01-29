import { BaseError } from './BaseError.js';
import { StatusCodes } from 'http-status-codes';

export class NotFoundError extends BaseError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.name = 'Not Found Error';
  }
}
