import { GetDataUserService } from './GetDataUserService';

describe('GetDataUserService', () => {
  const fakeRepository = {
    findByUid: jest.fn(),
  };

  const fakeParams = {
    userId: 'userIdTeste',
  };

  const fakeDataUsers = {
    uid: 'userIdTeste',
    name: 'teste',
    email: 'teste@teste',
    status: 'false',
    banned: false,
  };

  it('should show message error ("Usuário não está cadastrado!!")', async () => {
    fakeRepository.findByUid.mockResolvedValue(undefined);

    try {
      const getDataUserService = new GetDataUserService(fakeRepository);

      await getDataUserService.execute(fakeParams);
    } catch (error) {
      expect(error.message).toEqual('Usuário não está cadastrado!!');
    }
  });

  it('should return data user by id', async () => {
    fakeRepository.findByUid.mockResolvedValue(fakeDataUsers);

    const getDataUserService = new GetDataUserService(fakeRepository);

    const dataUser = await getDataUserService.execute(fakeParams);

    expect(dataUser != null).toBe(true);
    expect(fakeRepository.findByUid).toHaveBeenCalledWith(fakeParams.userId);
  });
});
