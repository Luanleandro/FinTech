import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository';

import { CreateUserController } from './CreateUserController';
import { CreateUserService } from './CreateUserService';

export const createUserFactory = () => {
  const createUserService = new CreateUserService(new UsersRepository());
  const createUserController = new CreateUserController(createUserService);

  return createUserController;
};
