import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository';
import { NotFoundError } from '@shared/errors/NotFoundError';

class GetDataUserService {
  constructor(usersRepository = new UsersRepository()) {
    this.usersRepository = usersRepository;
  }

  async execute(params) {
    const userData = await this.usersRepository.findByUid(params.userId);

    if (!userData) {
      throw new NotFoundError('Usuário não está cadastrado!!');
    }

    return userData;
  }
}

export { GetDataUserService };
