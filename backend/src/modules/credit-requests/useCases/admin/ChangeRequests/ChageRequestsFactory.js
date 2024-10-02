import { RequestsCreditRepository } from '@modules/credit-requests/infra/repositories/RequestsCreditRepository';

import { ChangeRequestsController } from './ChangeRequestsController';
import { ChangeRequestsService } from './ChangeRequestsService';

export const changeRequestsFactory = () => {
  const changeRequestsService = new ChangeRequestsService(
    new RequestsCreditRepository(),
  );

  const changeRequestsController = new ChangeRequestsController(
    changeRequestsService,
  );

  return changeRequestsController;
};
