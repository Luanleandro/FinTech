import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository';
import { BusinessError } from '@shared/errors/BusinessError';
import { NotFoundError } from '@shared/errors/NotFoundError';
import { hashSync } from 'bcryptjs';

class ChangeUserService {
  constructor(userRepository = new UsersRepository(), hashPassword = hashSync) {
    this.userRepository = userRepository;
    this.hashPassword = hashPassword;
  }

  async execute(params) {
    const userExist = await this.userRepository.findByUid(params.userId);

    if (!userExist) {
      throw new NotFoundError('O Usuário não está cadastrado!!');
    }

    if (userExist.status) {
      throw new BusinessError('Você já completou seu registro!!');
    }

    const updateData = {
      name: params.name,
      password: this.hashPassword(params.password),
      status: true,
      updated_at: new Date(),
    };

    const userUpdate = await this.userRepository.updateByUid({
      userId: params.userId,
      updateData,
    });

    return userUpdate;
  }
}

export { ChangeUserService };
