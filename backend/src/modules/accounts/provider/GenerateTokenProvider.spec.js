import { GenerateTokenProvider } from './GenerateTokenProvider';

describe('GenerateTokenProvider', () => {
  const fakePayload = {
    userId: 2,
    roleId: 1,
    email: 'teste@teste',
  };

  const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

  const fakeSecretPassowrd = 'teste';

  const sign = jest.fn();

  it('Should return token JWT', async () => {
    sign.mockResolvedValue(fakeToken, fakeSecretPassowrd, { expireIn: '1d' });

    const fakeGenerateTokenProvider = new GenerateTokenProvider(sign);
    const token = await fakeGenerateTokenProvider.execute(
      fakePayload,
      fakeSecretPassowrd,
    );

    expect(sign).toHaveBeenCalledWith(fakePayload, fakeSecretPassowrd, {
      expiresIn: '1d',
    });
    expect(token).toEqual(fakeToken);
  });
});
