import { GenerateTokenProvider } from '@modules/accounts/provider/GenerateTokenProvider';
import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository';
import { MailProvider } from '@shared/adapters/implemententions/mail/MailProvider';
import { BusinessError } from '@shared/errors/BusinessError';

class ResendEmailUserService {
  constructor(
    userRepository = new UsersRepository(),
    generateTokenProvider = new GenerateTokenProvider(),
    mailProvider = new MailProvider(),
  ) {
    this.userRepository = userRepository;
    this.generateTokenProvider = generateTokenProvider;
    this.mailProvider = mailProvider;
  }

  async execute(params) {
    const user = await this.userRepository.findByEmail(params.email);

    if (!user) {
      throw new BusinessError('O E-mail informado não existe!!');
    }

    if (user.status) {
      throw new BusinessError('Este usuário já ativou a conta');
    }

    const token = await this.generateTokenProvider.execute({
      userId: user.uid,
      email: user.email,
    });

    const link = process.env.URL_ACTIVATE;
    this.mailProvider.sendEmail(
      { ...user, link, token },
      'src/modules/accounts/view/inviteUser.hbs',
    );

    return { email: user.email };
  }
}

export { ResendEmailUserService };
