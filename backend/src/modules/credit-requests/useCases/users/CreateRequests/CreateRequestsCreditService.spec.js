import { CreateRequestsCreditService } from './CreateRequestsCreditService';

describe('CreateRequestsCreditService', () => {
  const fakeUserRepository = {
    findByUid: jest.fn(),
  };

  const fakeRequestsCreditRepository = {
    findLastByUserId: jest.fn(),
    create: jest.fn(),
  };

  const fakeDataUser = {
    uid: 'teste',
    name: 'user teste',
    email: 'teste@teste.com',
    status: true,
    banned: true,
    created_at: '2024-06-19 11:42:57.499 -0300',
  };

  const fakeRequest = {
    id: 1,
    user_id: 'teste',
    status: 'PENDING',
    value: 500,
    type: 'INCOME',
  };

  const params = {
    userId: 'teste',
    type: 'INCOME',
    value: 500,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show message error ("Você não pode criar por que está banido!!")', async () => {
    fakeUserRepository.findByUid.mockResolvedValue(fakeDataUser);
    fakeRequestsCreditRepository.findLastByUserId.mockResolvedValue(undefined);
    fakeRequestsCreditRepository.create.mockResolvedValue(undefined);

    try {
      const createCreditService = new CreateRequestsCreditService(
        fakeRequestsCreditRepository,
        fakeUserRepository,
      );

      await createCreditService.execute(params);
    } catch (error) {
      expect(error.message).toEqual(
        'Houve um problema na sua solicitação de crédito. Gentileza entrar em contato com o suporte',
      );
    }
    expect(fakeUserRepository.findByUid).toHaveBeenCalledWith(params.userId);
    expect(fakeRequestsCreditRepository.findLastByUserId).toHaveBeenCalledTimes(
      0,
    );
    expect(fakeUserRepository.findByUid).toHaveBeenCalledTimes(1);
    expect(fakeRequestsCreditRepository.create).toHaveBeenCalledTimes(0);
  });

  it('should create request', async () => {
    fakeDataUser.banned = false;
    fakeUserRepository.findByUid.mockResolvedValue(fakeDataUser);
    fakeRequestsCreditRepository.findLastByUserId.mockResolvedValue(
      fakeDataUser,
    );
    fakeRequestsCreditRepository.create.mockResolvedValue(fakeRequest);

    const createCreditService = new CreateRequestsCreditService(
      fakeRequestsCreditRepository,
      fakeUserRepository,
    );

    const request = await createCreditService.execute(params);

    expect(request != null).toBe(true);
    expect(fakeUserRepository.findByUid).toHaveBeenCalledWith(params.userId);
    expect(fakeRequestsCreditRepository.findLastByUserId).toHaveBeenCalledWith(
      params.userId,
    );

    const fakeRequestCreated = {
      created_at: expect.any(Date),
      status: 'PENDING',
      user_id: 'teste',
      value: 500,
    };
    expect(fakeRequestsCreditRepository.create).toHaveBeenCalledWith(
      fakeRequestCreated,
    );
    expect(fakeRequestsCreditRepository.findLastByUserId).toHaveBeenCalledTimes(
      1,
    );
    expect(fakeUserRepository.findByUid).toHaveBeenCalledTimes(1);
    expect(fakeRequestsCreditRepository.create).toHaveBeenCalledTimes(1);
  });
});
