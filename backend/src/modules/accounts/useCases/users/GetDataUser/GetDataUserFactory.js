import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository';

import { GetDataUserController } from './GetDataUserController';
import { GetDataUserService } from './GetDataUserService';

export const getDataUserFactory = () => {
  const getDataUserService = new GetDataUserService(new UsersRepository());
  const getDataUserController = new GetDataUserController(getDataUserService);

  return getDataUserController;
};
