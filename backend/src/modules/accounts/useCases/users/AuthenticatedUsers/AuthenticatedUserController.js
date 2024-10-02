import * as Yup from 'yup';

import { AuthenticatedUserService } from './AuthenticatedUserService';

class AuthenticatedUsersController {
  constructor(authenticatedUserService = new AuthenticatedUserService()) {
    this.authenticatedUserService = authenticatedUserService;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, next) {
    try {
      const { body } = req;

      const schema = Yup.object().shape({
        password: Yup.string()
          .required('A senha é obrigatória')
          .min(6, 'A senha deve conter no mínimo 6 caracteres!!'),
        email: Yup.string().required('O E-mail é obrigatório').email(),
      });

      const isValid = schema.isValidSync(body);
      if (!isValid) {
        const validate = schema.validateSync(body);
        return res.status(400).json({ message: validate });
      }

      const authenticateUser =
        await this.authenticatedUserService.execute(body);

      return res.status(201).json(authenticateUser);
    } catch (error) {
      return next(error);
    }
  }
}

export { AuthenticatedUsersController };
