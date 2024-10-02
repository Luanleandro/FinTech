import { RequestsCreditRepository } from '@modules/credit-requests/infra/repositories/RequestsCreditRepository';

class GetRequestsService {
  constructor(requestsCreditRepository = new RequestsCreditRepository()) {
    this.requestsCreditRepository = requestsCreditRepository;
  }

  async execute(params) {
    const requests = await this.requestsCreditRepository.findAll(
      params.roleId,
      params.userId,
    );

    return requests;
  }
}

export { GetRequestsService };
