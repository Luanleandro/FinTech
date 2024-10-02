import * as Yup from 'yup';

import { GetUserWalletByIdService } from './GetUserWalletByIdService';

class GetUserWalletByIdController {
  constructor(getUserWalletByIdService = new GetUserWalletByIdService()) {
    this.getUserWalletByIdService = getUserWalletByIdService;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, next) {
    try {
      const { userId } = req;
      const params = { userId };

      const schema = Yup.object().shape({
        userId: Yup.string()
          .required('O UserId é obrigatório!!')
          .uuid('O userId informado está inválido'),
      });

      const isValid = schema.isValidSync(params);
      if (!isValid) {
        const validate = schema.validateSync(params);
        return res.status(400).json({ message: validate });
      }

      const getUserWallet = await this.getUserWalletByIdService.execute(params);

      return res.json(getUserWallet);
    } catch (error) {
      return next(error);
    }
  }
}

export { GetUserWalletByIdController };
