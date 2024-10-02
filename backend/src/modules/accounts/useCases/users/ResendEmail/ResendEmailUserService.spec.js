import { ResendEmailUserService } from './ResendEmailUserService';

describe('ResendEmailUserService', () => {
  const fakeRepository = {
    findByEmail: jest.fn(),
  };

  const fakeGenerateTokenProvider = {
    execute: jest.fn(),
  };

  const fakeEmailProvider = {
    sendEmail: jest.fn(),
  };

  const fakeEmailResult = {
    accepted: ['teste@teste'],
    rejected: [],
    ehlo: ['PIPELINING', '8BITMIME', 'SMTPUTF8', 'AUTH LOGIN PLAIN'],
    envelopeTime: 738,
    messageTime: 542,
    messageSize: 1540,
    response: '250 Accepted teste',
    envelope: { from: 'teste@invite.com', to: ['teste@teste.com'] },
    messageId: '<ateste5c@invite.com>',
  };

  const fakeParams = {
    uid: 'uidTeste',
    name: 'teste',
    email: 'teste@teste',
    password: 'teste123',
    role_id: 2,
    status: false,
  };

  it("Should show message error ('O E-mail informado não existe!!')", async () => {
    fakeRepository.findByEmail.mockResolvedValue(undefined);
    fakeGenerateTokenProvider.execute.mockResolvedValue({
      userId: fakeParams.uid,
      email: fakeParams.email,
    });
    fakeEmailProvider.sendEmail.mockResolvedValue(fakeEmailProvider);

    try {
      const resendEmailUserService = new ResendEmailUserService(
        fakeRepository,
        fakeGenerateTokenProvider,
        fakeEmailProvider,
      );

      await resendEmailUserService.execute(fakeParams);
    } catch (error) {
      expect(error.message).toEqual('O E-mail informado não existe!!');
    }
    expect(fakeGenerateTokenProvider.execute).toHaveBeenCalledTimes(0);
    expect(fakeEmailProvider.sendEmail).toHaveBeenCalledTimes(0);
  });

  it("Should show message error ('Este usuário já ativou a conta')", async () => {
    fakeRepository.findByEmail.mockResolvedValue({
      status: true,
    });
    fakeGenerateTokenProvider.execute.mockResolvedValue({
      userId: fakeParams.uid,
      email: fakeParams.email,
    });
    fakeEmailProvider.sendEmail.mockResolvedValue(fakeEmailProvider);

    try {
      const resendEmailUserService = new ResendEmailUserService(
        fakeRepository,
        fakeGenerateTokenProvider,
        fakeEmailProvider,
      );

      await resendEmailUserService.execute(fakeParams);
    } catch (error) {
      expect(error.message).toEqual('Este usuário já ativou a conta');
    }
    expect(fakeRepository.findByEmail).toHaveBeenCalledWith(fakeParams.email);
    expect(fakeGenerateTokenProvider.execute).toHaveBeenCalledTimes(0);
    expect(fakeEmailProvider.sendEmail).toHaveBeenCalledTimes(0);
  });

  it('should called generate token and send email', async () => {
    fakeRepository.findByEmail.mockResolvedValue(fakeParams);
    fakeGenerateTokenProvider.execute.mockResolvedValue({
      userId: fakeParams.uid,
      email: fakeParams.email,
    });

    fakeEmailProvider.sendEmail.mockResolvedValue(fakeEmailResult);

    const resendEmailUserService = new ResendEmailUserService(
      fakeRepository,
      fakeGenerateTokenProvider,
      fakeEmailProvider,
    );

    const resendEmail = await resendEmailUserService.execute(fakeParams);

    expect(resendEmail != null).toBe(true);
    expect(fakeRepository.findByEmail).toHaveBeenCalledWith(fakeParams.email);
    expect(fakeGenerateTokenProvider.execute).toHaveBeenCalledWith({
      userId: fakeParams.uid,
      email: fakeParams.email,
    });
    expect(fakeGenerateTokenProvider.execute).toHaveBeenCalledTimes(1);
    expect(fakeEmailProvider.sendEmail).toHaveBeenCalledTimes(1);
  });
});
