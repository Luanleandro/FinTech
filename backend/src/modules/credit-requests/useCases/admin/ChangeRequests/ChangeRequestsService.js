import { RequestsCreditRepository } from '@modules/credit-requests/infra/repositories/RequestsCreditRepository';
import { BusinessError } from '@shared/errors/BusinessError';
import { NotFoundError } from '@shared/errors/NotFoundError';
import { CREDIT_REQUESTS_STATUS, TRANSACTIONS_TYPE } from '@utils/helper/utils';

class ChangeRequestsService {
  constructor(requestCreditRepository = new RequestsCreditRepository()) {
    this.requestCreditRepository = requestCreditRepository;
  }

  async execute(params) {
    const request = await this.requestCreditRepository.findById(
      params.requestId,
    );

    if (!request) {
      throw new NotFoundError('A solicitação não existe!!');
    }

    if (request.status !== CREDIT_REQUESTS_STATUS.PENDING) {
      throw new BusinessError('Você só pode alterar solicitações pendentes.');
    }

    if (params.status === CREDIT_REQUESTS_STATUS.REJECT) {
      const requestUpdate =
        await this.requestCreditRepository.changeStatusRejectById(
          params.requestId,
          params.status,
        );
      return requestUpdate;
    }

    const creditRequestUpdated = {
      creditRequest: {
        requestId: params.requestId,
        status: params.status,
        updated_at: new Date(),
      },
      transactionRequest: {
        user_id: request.user_id,
        value: request.value,
        type: TRANSACTIONS_TYPE.INCOME,
      },
    };

    const requestUpdate =
      await this.requestCreditRepository.changeStatusAcceptById(
        creditRequestUpdated,
      );
    return requestUpdate;
  }
}

export { ChangeRequestsService };
