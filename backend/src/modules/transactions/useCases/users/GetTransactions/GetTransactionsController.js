import * as Yup from 'yup';

import { GetTransactionsService } from './GetTransactionsService';

class GetTransactionsController {
  constructor(getTransactionsService = new GetTransactionsService()) {
    this.getTransactionsService = getTransactionsService;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, next) {
    try {
      const { userId, roleId } = req;
      const params = { userId, roleId };

      const schema = Yup.object().shape({
        userId: Yup.string()
          .required('O UserId é obrigatório!!')
          .uuid('O userId informado está inválido'),
        roleId: Yup.number().required('A roleId é obrigatória!!'),
      });

      const isValid = schema.isValidSync(params);
      if (!isValid) {
        const validate = schema.validateSync(params);
        return res.status(400).json({ message: validate });
      }

      const transactions = await this.getTransactionsService.execute(params);

      return res.json(transactions);
    } catch (error) {
      return next(error);
    }
  }
}

export { GetTransactionsController };
