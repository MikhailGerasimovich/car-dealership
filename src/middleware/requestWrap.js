import { BaseError } from '../errors/BaseError.js';
import { StatusCodes } from 'http-status-codes';

export function requestWrap(rote) {
  return async (req, res, next) => {
    try {
      await rote(req, res, next);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.statusCode).json({ code: error.statusCode, name: error.name, message: error.message });
        console.log(error);
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ code: StatusCodes.BAD_REQUEST, name: error.name, message: error.message });
        console.log(error);
      }
      next(error);
    }
  };
}
