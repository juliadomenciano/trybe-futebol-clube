import { genSaltSync, hashSync } from 'bcryptjs';

const passwordService = {
  encryptPassword: (password: string) => {
    const salt = genSaltSync(5);
    const encryptedPassword = hashSync(password, salt);
    return encryptedPassword;
  },
};

export default passwordService;
