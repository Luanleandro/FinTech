import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository';

import { AuthenticatedUsersController } from './AuthenticatedUserController';
import { AuthenticatedUserService } from './AuthenticatedUserService';

export const authenticatedUserFactory = () => {
  const authenticateUserService = new AuthenticatedUserService(
    new UsersRepository(),
  );

  const authenticateUserController = new AuthenticatedUsersController(
    authenticateUserService,
  );

  return authenticateUserController;
};
