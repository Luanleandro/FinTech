import { UserWalletRepository } from '@modules/user-wallet/infra/repositories/UserWalletRepository';

import { GetUserWalletByIdController } from './GetUserWalletByIdController';
import { GetUserWalletByIdService } from './GetUserWalletByIdService';

export const getUserWalletFactory = () => {
  const getUserWalletByIdService = new GetUserWalletByIdService(
    new UserWalletRepository(),
  );

  const getUserWalletByIdController = new GetUserWalletByIdController(
    getUserWalletByIdService,
  );

  return getUserWalletByIdController;
};
