import { GetRequestsService } from './GetRequestsService';

describe('GetRequestsService', () => {
  const fakeRepository = {
    findAll: jest.fn(),
  };

  const params = {
    roleId: 'testeRole',
    userId: 'testeUser',
  };

  const result = [
    {
      id: 14,
      user_id: 'teste',
      value: '1500.00',
      status: 'PENDING',
      type: 'EXPENSE',
      created_at: '2024-07-18T13:13:55.835Z',
      updated_at: '2024-07-18T13:13:55.835Z',
    },
  ];

  it('should return credit requests', async () => {
    fakeRepository.findAll.mockResolvedValue(result);

    const getRequestsService = new GetRequestsService(fakeRepository);

    const request = await getRequestsService.execute(params);

    expect(request != []).toBe(true);
    expect(fakeRepository.findAll).toHaveBeenCalledWith(
      params.roleId,
      params.userId,
    );
  });
});
