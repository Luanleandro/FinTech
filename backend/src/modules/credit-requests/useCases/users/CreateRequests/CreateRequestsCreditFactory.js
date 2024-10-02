import { RequestsCreditRepository } from '@modules/credit-requests/infra/repositories/RequestsCreditRepository';

import { CreateRequestsCreditController } from './CreateRequestsCreditController';
import { CreateRequestsCreditService } from './CreateRequestsCreditService';

export const createRequestCreditFactory = () => {
  const createRequestCreditService = new CreateRequestsCreditService(
    new RequestsCreditRepository(),
  );

  const createRequestCreditController = new CreateRequestsCreditController(
    createRequestCreditService,
  );

  return createRequestCreditController;
};
