import { NextFunction, Request, Response } from 'express';

interface IError {
  name: string,
  message: string
}

export default (err: IError, _req: Request, res: Response, _next: NextFunction) => {
  const { name, message } = err;
  switch (name) {
    case 'ValidationError':
      return res.status(400).json({ message });
      break;
    case 'Authorization':
      return res.status(401).json({ message });
      break;
    case 'NotFoundError':
      return res.status(404).json({ message });
      break;
    case 'LengthValidation':
      return res.status(422).json({ message });
      break;
    default:
      return res.status(401).json({ message: 'Token must be a valid token' });
      break;
  }
};
