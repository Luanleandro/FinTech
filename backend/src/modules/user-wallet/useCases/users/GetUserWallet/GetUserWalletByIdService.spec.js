import { GetUserWalletByIdService } from './GetUserWalletByIdService';

describe('GetUserWalletByIdService', () => {
  const fakeRepository = {
    findByUserId: jest.fn(),
  };

  const params = {
    userId: 'teste',
    roleId: 2,
  };

  const mockReturnDefault = {
    id: 1,
    user_id: 'teste',
    balance: 50,
    created_at: expect.any(Date),
    updated_at: expect.any(Date),
  };

  it('Should return list user wallet', async () => {
    fakeRepository.findByUserId.mockResolvedValue(mockReturnDefault);

    const getUserWallet = new GetUserWalletByIdService(fakeRepository);

    const userWallet = await getUserWallet.execute(params);

    expect(userWallet !== null).toBe(true);
    expect(fakeRepository.findByUserId).toHaveBeenCalledWith(params.userId);
  });
});
