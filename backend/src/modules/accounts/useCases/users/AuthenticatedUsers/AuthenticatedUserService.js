import { GenerateTokenProvider } from '@modules/accounts/provider/GenerateTokenProvider';
import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository';
import { InvalidDataError } from '@shared/errors/InvalidDataError';
import { NotFoundError } from '@shared/errors/NotFoundError';
import { compareSync } from 'bcryptjs';

class AuthenticatedUserService {
  constructor(
    usersRepository = new UsersRepository(),
    CompareSync = compareSync,
    generateTokenProvider = new GenerateTokenProvider(),
  ) {
    this.usersRepository = usersRepository;
    this.compareSync = CompareSync;
    this.generateTokenProvider = generateTokenProvider;
  }

  async execute(params) {
    const user = await this.usersRepository.findByEmail(params.email);

    if (!user) {
      throw new NotFoundError('Usuario não encontrado!');
    }
    const passwordCompare = this.compareSync(params.password, user.password);

    if (!passwordCompare) {
      throw new InvalidDataError('Senha incorreta!!');
    }

    const token = await this.generateTokenProvider.execute({
      userId: user.uid,
      roleId: user.role_id,
      email: user.email,
    });

    return {
      token,
      name: user.name,
      email: user.email,
    };
  }
}

export { AuthenticatedUserService };
