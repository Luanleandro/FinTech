import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository';

import { ResendEmailUserController } from './ResendEmailUserController';
import { ResendEmailUserService } from './ResendEmailUserService';

export const resendEmailUserFactory = () => {
  const resendEmailUserService = new ResendEmailUserService(
    new UsersRepository(),
  );
  const resendEmailUserController = new ResendEmailUserController(
    resendEmailUserService,
  );

  return resendEmailUserController;
};
