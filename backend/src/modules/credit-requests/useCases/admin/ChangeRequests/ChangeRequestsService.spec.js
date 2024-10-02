import { ChangeRequestsService } from './ChangeRequestsService';

describe('ChangeRequestsService', () => {
  const fakeRepository = {
    findById: jest.fn(),
    changeStatusAcceptById: jest.fn(),
    changeStatusRejectById: jest.fn(),
  };

  const params = {
    requestId: 110,
    status: 'ACCEPT',
  };

  const fakeCreditRequest = {
    id: 110,
    user_id: 'testeId',
    value: '500.00',
    status: 'PENDING',
    type: 'INCOME',
    created_at: '2024-07-17T18:49:48.817Z',
    updated_at: '2024-07-17T18:49:48.817Z',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show message error ("A solicitação não existe!!")', async () => {
    fakeRepository.findById.mockResolvedValue(undefined);

    try {
      const changeRequestsService = new ChangeRequestsService(fakeRepository);

      await changeRequestsService.execute(params);
    } catch (error) {
      expect(error.message).toEqual('A solicitação não existe!!');
    }
  });

  it('should show message error ("Você só pode alterar solicitações pendentes..")', async () => {
    fakeRepository.findById.mockResolvedValue({
      ...fakeCreditRequest,
      status: 'REJECT',
    });

    try {
      const changeRequestsService = new ChangeRequestsService(fakeRepository);

      await changeRequestsService.execute(params);
    } catch (error) {
      expect(error.message).toEqual(
        'Você só pode alterar solicitações pendentes.',
      );
    }
  });

  it('Should update reject Credit Request', async () => {
    const paramsReject = {
      requestId: 110,
      status: 'REJECT',
    };

    fakeRepository.findById.mockResolvedValue(fakeCreditRequest);
    fakeRepository.changeStatusRejectById.mockResolvedValue({
      ...fakeCreditRequest,
      status: 'REJECT',
    });

    const changeRequestsService = new ChangeRequestsService(fakeRepository);

    const requestUpdate = await changeRequestsService.execute(paramsReject);

    expect(requestUpdate != null).toBe(true);
    expect(fakeRepository.findById).toHaveBeenCalledWith(params.requestId);
    expect(fakeRepository.changeStatusRejectById).toHaveBeenCalledWith(
      paramsReject.requestId,
      paramsReject.status,
    );
    expect(fakeRepository.findById).toHaveBeenCalledTimes(1);
    expect(fakeRepository.changeStatusRejectById).toHaveBeenCalledTimes(1);
  });

  it('Should update status Credit Request', async () => {
    fakeRepository.findById.mockResolvedValue(fakeCreditRequest);
    fakeRepository.changeStatusAcceptById.mockResolvedValue({
      ...fakeCreditRequest,
      status: 'ACCEPT',
    });

    const changeRequestsService = new ChangeRequestsService(fakeRepository);

    const requestUpdate = await changeRequestsService.execute(params);

    expect(requestUpdate != null).toBe(true);
    expect(fakeRepository.findById).toHaveBeenCalledWith(params.requestId);
    expect(fakeRepository.changeStatusAcceptById).toHaveBeenCalledWith({
      creditRequest: {
        requestId: params.requestId,
        status: params.status,
        updated_at: expect.any(Date),
      },
      transactionRequest: {
        user_id: fakeCreditRequest.user_id,
        type: fakeCreditRequest.type,
        value: fakeCreditRequest.value,
      },
    });
    expect(fakeRepository.findById).toHaveBeenCalledTimes(1);
    expect(fakeRepository.changeStatusAcceptById).toHaveBeenCalledTimes(1);
  });
});
