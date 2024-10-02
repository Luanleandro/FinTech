import { GenerateTokenProvider } from '@modules/accounts/provider/GenerateTokenProvider';
import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository';
import { MailProvider } from '@shared/adapters/implemententions/mail/MailProvider';
import { BusinessError } from '@shared/errors/BusinessError';
import { v4 as uuidv4 } from 'uuid';

class CreateUserService {
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
    const userReadyExist = await this.userRepository.findByEmail(params.email);

    if (userReadyExist) {
      throw new BusinessError('O e-mail informado já recebeu um convite!!');
    }

    const nameTempory = params.email.split('@')[0];
    const now = new Date();

    const dataUser = {
      uid: uuidv4(),
      name: nameTempory,
      password: `${Date.now()}_tempory`,
      email: params.email,
      avatar: null,
      created_at: now,
      role_id: params.role_id,
      status: false,
      banned: false,
    };

    const dataWallet = {
      uid: uuidv4(),
      user_id: dataUser.uid,
      balance: 0,
      created_at: now,
    };

    const user = await this.userRepository.create({ dataWallet, dataUser });

    const token = await this.generateTokenProvider.execute({
      userId: user.uid,
      email: user.email,
    });

    const link = process.env.URL_ACTIVATE;

    this.mailProvider.sendEmail(
      { ...user, link, token },
      'src/modules/accounts/view/inviteUser.hbs',
    );

    return { token };
  }
}

export { CreateUserService };
