import { AuthenticatedUserService } from './AuthenticatedUserService';

describe('AuthenticatedUserService', () => {
  const fakeUserRepository = {
    findByEmail: jest.fn(),
  };

  const fakeGenerateTokenProvider = {
    execute: jest.fn(),
  };

  const params = {
    email: 'teste@teste',
    password: 'teste123',
  };

  const fakeUser = {
    uid: 5,
    name: 'user',
    email: 'teste@teste',
    password: 'teste123',
    role_id: 1,
    status: true,
  };

  const compareSync = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show message error ("Usuario não encontrado!")', async () => {
    fakeUserRepository.findByEmail.mockResolvedValue(undefined);

    try {
      const authenticateUserService = new AuthenticatedUserService(
        fakeUserRepository,
        compareSync,
        fakeGenerateTokenProvider,
      );

      await authenticateUserService.execute(params);
    } catch (error) {
      expect(error.message).toEqual('Usuario não encontrado!');
    }
    expect(compareSync).toHaveBeenCalledTimes(0);
    expect(fakeGenerateTokenProvider.execute).toHaveBeenCalledTimes(0);
  });

  it('should show message error "Senha incorreta!!", if password wrong', async () => {
    fakeUserRepository.findByEmail.mockResolvedValue({
      password: 'teste',
      ...fakeUser,
    });

    try {
      const authenticateUserService = new AuthenticatedUserService(
        fakeUserRepository,
        compareSync,
        fakeGenerateTokenProvider,
      );

      await authenticateUserService.execute(params);
    } catch (error) {
      expect(error.message).toEqual('Senha incorreta!!');
    }
    expect(fakeUserRepository.findByEmail).toHaveBeenCalledWith(params.email);
    expect(compareSync).toHaveBeenCalledWith(
      params.password,
      fakeUser.password,
    );
    expect(compareSync).toHaveBeenCalledTimes(1);
    expect(fakeGenerateTokenProvider.execute).toHaveBeenCalledTimes(0);
  });

  it('should called generate Token', async () => {
    fakeUserRepository.findByEmail.mockResolvedValue(fakeUser);
    fakeGenerateTokenProvider.execute.mockResolvedValue({
      userId: fakeUser.id,
      roleId: fakeUser.role_id,
      email: fakeUser.email,
    });
    compareSync.mockReturnValue(true);

    const authenticateUserService = new AuthenticatedUserService(
      fakeUserRepository,
      compareSync,
      fakeGenerateTokenProvider,
    );

    const authenticatedUser = await authenticateUserService.execute(params);

    expect(authenticatedUser != null).toBe(true);
    expect(fakeUserRepository.findByEmail).toHaveBeenCalledWith(params.email);
    expect(compareSync).toHaveBeenCalledWith(
      params.password,
      fakeUser.password,
    );
    expect(fakeGenerateTokenProvider.execute).toHaveBeenCalledWith({
      userId: fakeUser.uid,
      roleId: fakeUser.role_id,
      email: fakeUser.email,
    });
    expect(compareSync).toHaveBeenCalledTimes(1);
    expect(fakeGenerateTokenProvider.execute).toHaveBeenCalledTimes(1);
  });
});
