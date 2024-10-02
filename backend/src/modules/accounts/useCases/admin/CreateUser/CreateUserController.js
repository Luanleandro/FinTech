import { isEmail } from '@utils/helper/utils';
import * as Yup from 'yup';

import { CreateUserService } from './CreateUserService';
class CreateUserController {
  constructor(createUserService = new CreateUserService()) {
    this.createUserService = createUserService;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, next) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('O e-mail é obrigatório')
          .matches(isEmail, 'O e-mail informado é inválido!!'),
        role_id: Yup.number()
          .oneOf([1, 2])
          .integer('O role_id está em um formato inválido')
          .required('O role_id é obrigatório'),
      });

      const userData = req.body;
      const isValid = schema.isValidSync(userData);
      if (!isValid) {
        const validate = schema.validateSync(userData);
        return res.status(400).json({ message: validate });
      }

      const user = await this.createUserService.execute({
        email: userData.email,
        role_id: userData.role_id,
      });

      return res.status(201).json(user);
    } catch (error) {
      return next(error);
    }
  }
}

export { CreateUserController };
