import { NextFunction, Request, Response } from 'express';
import { refactorErrorMessage } from '../utils/refactorErrorMessage';
import { ValidationError } from 'yup';

export const errorHandler = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
): any => {
  console.log(err.constructor.name, err);
  if (err) {
    if (err instanceof ValidationError) {
        console.log("you here")
      return res.status(400).json({
        success: false,
        message: refactorErrorMessage(err),
      });
    } else if (err instanceof Error) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    } 
    else {
      return res.status(400).json({
        success: false,
        message: err,
      });
    }
  }

  next();
};
