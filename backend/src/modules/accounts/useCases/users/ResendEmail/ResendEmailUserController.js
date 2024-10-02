import { isEmail } from '@utils/helper/utils';
import * as Yup from 'yup';

import { ResendEmailUserService } from './ResendEmailUserService';

class ResendEmailUserController {
  constructor(resendEmailUserService = new ResendEmailUserService()) {
    this.resendEmailUserService = resendEmailUserService;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, next) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .matches(isEmail, 'O e-mail informado é inválido!!')
          .required('O email é obrigatório'),
      });

      const userData = req.body;
      const isValid = schema.isValidSync(userData);
      if (!isValid) {
        const validade = schema.validateSync(userData);
        return res.status(400).json({ message: validade });
      }

      const user = await this.resendEmailUserService.execute(userData);
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }
}

export { ResendEmailUserController };
