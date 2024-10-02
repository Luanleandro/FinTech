import { DeleteTransactionsService } from './DeleteTransactionsService';

describe('DeleteTransactionsService', () => {
  const fakeRepository = {
    findById: jest.fn(),
    deleteById: jest.fn(),
  };

  const params = {
    userId: 'testeUid',
    transactionId: 18,
  };

  const fakeDelete = {
    user_id: 'testeUid',
    value: '1000.00',
    created_at: '2024-07-16T18:31:36.871Z',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show message error ("Essa transação não existe!!")', async () => {
    fakeRepository.findById.mockResolvedValue(undefined);

    try {
      const deleteTransactionService = new DeleteTransactionsService(
        fakeRepository,
      );

      await deleteTransactionService.execute(params);
    } catch (error) {
      expect(error.message).toEqual('Essa transação não existe!!');
    }
    expect(fakeRepository.deleteById).toHaveBeenCalledTimes(0);
  });

  it('should show message error ("Você não tem permissão para realizar essa operação!!")', async () => {
    fakeRepository.findById.mockResolvedValue({
      ...fakeDelete,
      user_id: 'testeDelete',
    });

    try {
      const deleteTransactionService = new DeleteTransactionsService(
        fakeRepository,
      );

      await deleteTransactionService.execute(params);
    } catch (error) {
      expect(error.message).toEqual(
        'Você não tem permissão para realizar essa operação!!',
      );
    }
    expect(fakeRepository.findById).toHaveBeenCalledWith(params.transactionId);
    expect(fakeRepository.deleteById).toHaveBeenCalledTimes(0);
  });

  it('should return transaction deleted', async () => {
    fakeRepository.findById.mockResolvedValue(fakeDelete);
    fakeRepository.deleteById.mockResolvedValue({
      ...fakeDelete,
      id: 1,
      type: 'INCOME',
      updated_at: expect.any(Date),
    });

    const deleteTransactionService = new DeleteTransactionsService(
      fakeRepository,
    );

    const transaction = await deleteTransactionService.execute(params);

    expect(transaction != null).toBe(true);
    expect(fakeRepository.findById).toHaveBeenCalledWith(params.transactionId);
    expect(fakeRepository.deleteById).toHaveBeenCalledWith(
      params.transactionId,
    );
    expect(fakeRepository.deleteById).toHaveBeenCalledTimes(1);
    expect(fakeRepository.deleteById).toHaveBeenCalledTimes(1);
  });
});
