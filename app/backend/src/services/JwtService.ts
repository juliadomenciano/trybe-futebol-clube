import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';
import IPayload from '../interfaces/IPayload';

export default class JwtService {
  static createToken(payload: object): string {
    return sign(payload, process.env.JWT_SECRET as string);
  }

  static validateToken(token: string): IPayload {
    const payload = verify(token, process.env.JWT_SECRET as string);
    if (!payload) {
      const e = new Error('Token must be a valid token');
      e.name = 'Authorization';
      throw e;
    }
    return payload as IPayload;
  }
}
