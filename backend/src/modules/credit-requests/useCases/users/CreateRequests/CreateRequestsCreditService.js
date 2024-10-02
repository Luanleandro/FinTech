import { RequestsCreditRepository } from '@modules/credit-requests/infra/repositories/RequestsCreditRepository';
import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository';
import { BusinessError } from '@shared/errors/BusinessError';
import { CREDIT_REQUESTS_STATUS } from '@utils/helper/utils';
import dayjs from 'dayjs';

const MONTH_LIMIT = 1;

class CreateRequestsCreditService {
  constructor(
    requestsCreditRepository = new RequestsCreditRepository(),
    usersRepository = new UsersRepository(),
  ) {
    this.requestsCreditRepository = requestsCreditRepository;
    this.usersRepository = usersRepository;
  }

  async execute(params) {
    const userData = await this.usersRepository.findByUid(params.userId);

    if (userData.banned) {
      throw new BusinessError(
        'Houve um problema na sua solicitação de crédito. Gentileza entrar em contato com o suporte',
      );
    }

    const lastRequest = await this.requestsCreditRepository.findLastByUserId(
      params.userId,
    );

    if (lastRequest) {
      const diffMonth = dayjs().diff(dayjs(lastRequest?.created_at), 'month');

      if (diffMonth < MONTH_LIMIT) {
        throw new BusinessError(
          'Você só pode fazer outra solicitação após 1 mês!!',
        );
      }
    }

    const request = await this.requestsCreditRepository.create({
      user_id: params.userId,
      value: params.value,
      status: CREDIT_REQUESTS_STATUS.PENDING,
      created_at: new Date(),
    });

    return request;
  }
}

export { CreateRequestsCreditService };
