import * as Yup from 'yup';

import { ChangeUserService } from './ChangeUserService';

class ChangeUserController {
  constructor(changeUserService = new ChangeUserService()) {
    this.changeUserService = changeUserService;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, next) {
    try {
      const schema = Yup.object().shape({
        password: Yup.string()
          .required('A senha é obrigatória')
          .min(6, 'A senha deve conter no mínimo 6 caracteres!!'),
        name: Yup.string()
          .required('O nome é obrigatório')
          .min(4, 'O nome deve conter no mínimo 4 caracteres!!'),
        userId: Yup.string()
          .required('O userId é obrigatório.')
          .uuid('O userId informado está inválido'),
      });

      const userData = req.body;
      const isValid = schema.isValidSync(userData);
      if (!isValid) {
        const validate = schema.validateSync(userData);
        return res.status(400).json({ message: validate });
      }

      const result = await this.changeUserService.execute(userData);

      return res.json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export { ChangeUserController };
