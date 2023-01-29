import { BaseError } from './BaseError.js';
import { StatusCodes } from 'http-status-codes';

export class ConflictError extends BaseError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;
    this.name = 'Conflict Error';
  }
}
