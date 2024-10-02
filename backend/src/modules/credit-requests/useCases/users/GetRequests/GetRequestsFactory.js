import { RequestsCreditRepository } from '@modules/credit-requests/infra/repositories/RequestsCreditRepository';

import { GetRequestsController } from './GetRequestsController';
import { GetRequestsService } from './GetRequestsService';

export const getRequestsFactory = () => {
  const getRequestService = new GetRequestsService(
    new RequestsCreditRepository(),
  );

  const getRequestsController = new GetRequestsController(getRequestService);

  return getRequestsController;
};
