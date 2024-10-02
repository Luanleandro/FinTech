import { CreateUserService } from './CreateUserService';

describe('CreateUserService', () => {
  const fakeUserRepository = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const fakeGenerateTokenProvider = {
    execute: jest.fn(),
  };

  const fakeEmailProvider = {
    sendEmail: jest.fn(),
  };

  const fakeParams = {
    email: 'teste@jest.com',
    role_id: 2,
  };

  const mockResolvedDefault = {
    uid: 'teste',
    name: 'teste',
    email: 'teste@jest.com',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show message error ('O e-mail informado já recebeu um convite!!'", async () => {
    fakeUserRepository.findByEmail.mockResolvedValue(fakeParams.email);

    try {
      const createUserService = new CreateUserService(
        fakeUserRepository,
        fakeGenerateTokenProvider,
        fakeEmailProvider,
      );

      await createUserService.execute(fakeParams);
    } catch (error) {
      expect(error.message).toEqual(
        'O e-mail informado já recebeu um convite!!',
      );
      expect(fakeGenerateTokenProvider.execute).toHaveBeenCalledTimes(0);
      expect(fakeEmailProvider.sendEmail).toHaveBeenCalledTimes(0);
    }
  });

  it('Should send activation email, called generateToken and MailProvider', async () => {
    fakeUserRepository.findByEmail.mockResolvedValue(undefined);
    fakeUserRepository.create.mockResolvedValue(mockResolvedDefault);
    fakeGenerateTokenProvider.execute.mockResolvedValue({
      userId: mockResolvedDefault.uid,
      email: mockResolvedDefault.email,
    });
    fakeEmailProvider.sendEmail.mockResolvedValue(fakeEmailProvider);

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeGenerateTokenProvider,
      fakeEmailProvider,
    );

    const user = await createUserService.execute(fakeParams);

    expect(user != null).toBe(true);
    expect(fakeUserRepository.findByEmail).toHaveBeenCalledWith(
      fakeParams.email,
    );
    expect(fakeUserRepository.create).toHaveBeenCalledWith({
      dataUser: {
        uid: expect.any(String),
        name: 'teste',
        password: expect.any(String),
        email: fakeParams.email,
        avatar: null,
        created_at: expect.any(Date),
        role_id: fakeParams.role_id,
        status: false,
        banned: false,
      },
      dataWallet: {
        uid: expect.any(String),
        balance: 0,
        user_id: expect.any(String),
        created_at: expect.any(Date),
      },
    });
    expect(fakeGenerateTokenProvider.execute).toHaveBeenCalledWith({
      userId: mockResolvedDefault.uid,
      email: mockResolvedDefault.email,
    });

    expect(fakeEmailProvider.sendEmail).toHaveBeenCalledTimes(1);
    expect(fakeGenerateTokenProvider.execute).toHaveBeenCalledTimes(1);
  });
});
