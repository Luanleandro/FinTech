import { UserWalletRepository } from '@modules/user-wallet/infra/repositories/UserWalletRepository';

class GetUserWalletByIdService {
  constructor(userWalletRepository = new UserWalletRepository()) {
    this.userWalletRepository = userWalletRepository;
  }

  async execute(params) {
    const userWallet = await this.userWalletRepository.findByUserId(
      params.userId,
    );

    return userWallet;
  }
}

export { GetUserWalletByIdService };
