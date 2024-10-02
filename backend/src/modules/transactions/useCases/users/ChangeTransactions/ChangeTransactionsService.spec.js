import { ChangeTransactionsService } from './ChangeTransactionsService';

describe('ChangeTransactionsService', () => {
  const fakeRepository = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  const params = {
    userId: 'testeUid',
    transactionId: 15,
    value: 0,
    type: 'INCOME',
    description: 'teste',
  };

  const fakeTransactions = {
    id: 15,
    user_id: 'testeUid',
    value: 0,
    type: 'INCOME',
    created_at: 'data',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show message error ("A transação não existe!!")', async () => {
    fakeRepository.findById.mockResolvedValue(undefined);

    try {
      const changeTransactionsService = new ChangeTransactionsService(
        fakeRepository,
      );

      await changeTransactionsService.execute(params);
    } catch (error) {
      expect(error.message).toEqual('A transação não existe!!');
    }
    expect(fakeRepository.findById).toHaveBeenCalledTimes(1);
    expect(fakeRepository.update).toHaveBeenCalledTimes(0);
  });

  it('should show message error ("Você não tem permissão para realizar essa operação!!")', async () => {
    fakeRepository.findById.mockResolvedValue({
      ...fakeTransactions,
      user_id: 'teste',
    });

    try {
      const changeTransactionsService = new ChangeTransactionsService(
        fakeRepository,
      );

      await changeTransactionsService.execute(params);
    } catch (error) {
      expect(error.message).toEqual(
        'Você não tem permissão para realizar essa operação!!',
      );
    }
    expect(fakeRepository.findById).toHaveBeenCalledWith(params.transactionId);
    expect(fakeRepository.findById).toHaveBeenCalledTimes(1);
    expect(fakeRepository.update).toHaveBeenCalledTimes(0);
  });

  it('should change transaction', async () => {
    fakeRepository.findById.mockResolvedValue(fakeTransactions);
    fakeRepository.update.mockResolvedValue(params);

    const changeTransactionsService = new ChangeTransactionsService(
      fakeRepository,
    );

    const transaction = await changeTransactionsService.execute(params);

    expect(transaction != null).toBe(true);
    expect(fakeRepository.findById).toHaveBeenCalledWith(params.transactionId);
    expect(fakeRepository.update).toHaveBeenCalledWith({
      id: params.transactionId,
      value: params.value,
      type: params.type,
      description: params.description,
      updated_at: expect.any(Date),
    });
    expect(fakeRepository.findById).toHaveBeenCalledTimes(1);
    expect(fakeRepository.update).toHaveBeenCalledTimes(1);
  });
});
