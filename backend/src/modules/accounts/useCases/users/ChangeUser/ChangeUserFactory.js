import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository';

import { ChangeUserController } from './ChangeUserController';
import { ChangeUserService } from './ChangeUserService';

export const changeUserFactory = () => {
  const changeUpdateUserService = new ChangeUserService(new UsersRepository());
  const changeUserController = new ChangeUserController(
    changeUpdateUserService,
  );

  return changeUserController;
};
