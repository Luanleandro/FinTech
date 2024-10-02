import * as Yup from 'yup';

import { DeleteTransactionsService } from './DeleteTransactionsService';

class DeleteTransactionsController {
  constructor(deleteTransactionsService = new DeleteTransactionsService()) {
    this.deleteTransactionsService = deleteTransactionsService;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, next) {
    try {
      const { body, userId } = req;
      const params = { ...body, userId };

      const schema = Yup.object().shape({
        userId: Yup.string()
          .required('O userId é obrigatório.')
          .uuid('O userId informado está inválido'),
        transactionId: Yup.number('O Id informado está inválido').required(
          'O id da transação é obrigatório!!',
        ),
      });

      const isValid = schema.isValidSync(params);
      if (!isValid) {
        const validate = schema.validateSync(params);
        return res.status(400).json({ message: validate });
      }

      const transaction = await this.deleteTransactionsService.execute(params);

      return res.json(transaction);
    } catch (error) {
      return next(error);
    }
  }
}

export { DeleteTransactionsController };
