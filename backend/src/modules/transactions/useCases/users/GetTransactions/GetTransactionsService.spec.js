import { GetTransactionsService } from './GetTransactionsService';

describe('GetTransactionsService', () => {
  const fakeRepository = {
    findAll: jest.fn(),
  };

  const params = {
    userId: 'teste',
    roleId: 2,
  };

  const fakeTransactions = {
    id: 8,
    user_id: 'teste',
    value: '800.00',
    type: 'EXPENSE',
    created_at: '2024-07-15T14:46:40.196Z',
    updated_at: '2024-07-15T14:46:40.196Z',
  };

  it('should show message error ("Não existe nenhuma transação!!")', async () => {
    fakeRepository.findAll.mockResolvedValue([]);

    try {
      const getTransactionService = new GetTransactionsService(fakeRepository);
      await getTransactionService.execute(params);
    } catch (error) {
      expect(error.message).toEqual('Não existe nenhuma transação!!');
    }
  });

  it('should return list transactions', async () => {
    fakeRepository.findAll.mockResolvedValue([fakeTransactions]);

    const getTransactionService = new GetTransactionsService(fakeRepository);
    const listTransaction = await getTransactionService.execute(params);

    expect(listTransaction !== null).toBe(true);
    expect(fakeRepository.findAll).toHaveBeenCalledWith({
      userId: params.userId,
      roleId: params.roleId,
    });
  });
});
