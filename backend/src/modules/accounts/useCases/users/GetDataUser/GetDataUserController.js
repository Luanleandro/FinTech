import * as Yup from 'yup';

import { GetDataUserService } from './GetDataUserService';

class GetDataUserController {
  constructor(getDataUserService = new GetDataUserService()) {
    this.getDataUserService = getDataUserService;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, next) {
    try {
      const schema = Yup.object().shape({
        userId: Yup.string()
          .required('O UserId é  obrigatório!!')
          .uuid('O userId informado está inválido'),
      });

      const userData = req.query;

      const isValid = schema.isValidSync(userData);
      if (!isValid) {
        const validate = schema.validateSync(userData);
        return res.status(400).json({ message: validate });
      }

      const user = await this.getDataUserService.execute(userData);

      return res.json(user);
    } catch (error) {
      return next(error);
    }
  }
}

export { GetDataUserController };
