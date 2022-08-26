import { compare } from 'bcryptjs';
import User from '../database/models/user';
import JwtService from './JwtService';

class AuthService {
  login = async (email: string, userPassword: string): Promise<string> => {
    const getUser = await User.findOne({ where: { email }, raw: true });
    if (!getUser) {
      const e = new Error('Incorrect email or password');
      e.name = 'Authorization';
      throw e;
    }
    const decryptPassword = await compare(userPassword, getUser.password);
    if (!decryptPassword) {
      const e = new Error('Incorrect email or password');
      e.name = 'Authorization';
      throw e;
    }
    const payload = {
      email: getUser?.email,
      username: getUser?.username,
      role: getUser?.role };
    const token = JwtService.createToken(payload);
    return token;
  };

  validation = async (data: string): Promise<string> => {
    const payload = JwtService.validateToken(data);
    return payload.role;
  };
}

export default AuthService;
