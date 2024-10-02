import { ChangeUserService } from './ChangeUserService';

describe('ChangeUserService', () => {
  const fakeUserRepository = {
    findByUid: jest.fn(),
    updateByUid: jest.fn(),
  };

  const hashPassword = jest.fn().mockResolvedValue('teste');

  const fakeParams = {
    userId: 'fakeUserId',
    name: 'testeUser',
    password: 'teste',
  };

  it('should show message error ("Usuário não está cadastrado")', async () => {
    fakeUserRepository.findByUid.mockResolvedValue(undefined);
    const changeUserService = new ChangeUserService(
      fakeUserRepository,
      hashPassword,
    );

    try {
      await changeUserService.execute(fakeParams);
    } catch (error) {
      expect(fakeUserRepository.findByUid).toHaveBeenCalledWith(
        fakeParams.userId,
      );
      expect(error.message).toEqual('O Usuário não está cadastrado!!');
    }
  });

  it('shoul show message error ("Você já completou seu registro!!")', async () => {
    fakeUserRepository.findByUid.mockResolvedValue({ status: true });

    try {
      const changeUserService = new ChangeUserService(
        fakeUserRepository,
        hashPassword,
      );

      await changeUserService.execute(fakeParams);
    } catch (error) {
      expect(error.message).toEqual('Você já completou seu registro!!');
    }
    expect(fakeUserRepository.findByUid).toHaveBeenCalledWith(
      fakeParams.userId,
    );
  });

  it('should complete change of user data ', async () => {
    fakeUserRepository.findByUid.mockResolvedValue({ status: false });
    fakeUserRepository.updateByUid.mockResolvedValue({
      uid: fakeParams.userId,
      name: fakeParams.name,
      email: 'teste@teste.com',
    });
    hashPassword.mockReturnValue(fakeParams.password);

    const changeUserService = new ChangeUserService(
      fakeUserRepository,
      hashPassword,
    );

    const user = await changeUserService.execute(fakeParams);

    expect(user != null).toBe(true);
    expect(fakeUserRepository.findByUid).toHaveBeenCalledWith(
      fakeParams.userId,
    );
    expect(fakeUserRepository.updateByUid).toHaveBeenCalledWith({
      userId: fakeParams.userId,
      updateData: {
        name: fakeParams.name,
        password: fakeParams.password,
        status: true,
        updated_at: expect.any(Date),
      },
    });
    expect(hashPassword).toHaveBeenCalledWith(fakeParams.password);
  });
});
