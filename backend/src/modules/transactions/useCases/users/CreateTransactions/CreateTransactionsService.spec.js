import { CreateTransactionsService } from './CreateTransactionsService';

describe('CreateTransactionsService', () => {
  const fakeRepository = {
    create: jest.fn(),
  };

  const params = {
    uid: 'testeUID',
    value: 500,
    type: 'EXPENSE',
    description: 'Teste',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create transactions', async () => {
    fakeRepository.create.mockResolvedValue(params);

    const createService = new CreateTransactionsService(fakeRepository);

    const createTransaction = await createService.execute(params);

    expect(createTransaction != null).toBe(true);
    expect(fakeRepository.create).toHaveBeenCalledWith({
      user_id: params.userId,
      value: params.value,
      type: params.type,
      description: params.description,
    });
    expect(fakeRepository.create).toHaveBeenCalledTimes(1);
  });
});
