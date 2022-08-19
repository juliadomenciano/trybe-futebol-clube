import { Request, Response } from 'express';

import ILogin from '../interfaces/ILogin';
import AuthService from '../services/AuthService';

class AuthController {
  public service: AuthService;

  constructor(service: AuthService = new AuthService()) {
    this.service = service;
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as ILogin;
    if (!email || !password) {
      const e = new Error('All fields must be filled');
      e.name = 'ValidationError';
      throw e;
    }
    const token = await this.service.login(email, password);
    return res.status(200).json({ token });
  }

  async validation(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    if (!authorization) {
      const e = new Error('Invalid token');
      e.name = 'Authorization';
      throw e;
    }
    const role = await this.service.validation(authorization);
    return res.status(200).json({ role });
  }
}

export = AuthController;
