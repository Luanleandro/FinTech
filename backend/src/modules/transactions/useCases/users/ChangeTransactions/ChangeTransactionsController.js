import * as Yup from 'yup';

import { ChangeTransactionsService } from './ChangeTransactionsService';

class ChangeTransactionsController {
  constructor(changeTransactionsService = new ChangeTransactionsService()) {
    this.changeTransactionsService = changeTransactionsService;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, next) {
    try {
      const { body, userId } = req;
      const params = { ...body, userId };

      const schema = Yup.object().shape({
        type: Yup.string().oneOf(
          ['INCOME', 'EXPENSE'],
          'O tipo informado é inválido',
        ),
        value: Yup.number().required('Você deve informar o valor.'),
        description: Yup.string().required(
          'A transação precisa de uma descrição.',
        ),
        userId: Yup.string()
          .required('O userId é obrigatório!!')
          .uuid('O userId informado está inválido.'),
        transactionId: Yup.number().required('O id da transação é obrigatório'),
      });

      const isValid = schema.isValidSync(params);
      if (!isValid) {
        const validate = schema.validateSync(params);
        return res.status(400).json({ message: validate });
      }

      const transaction = await this.changeTransactionsService.execute(params);

      return res.json(transaction);
    } catch (error) {
      return next(error);
    }
  }
}

export { ChangeTransactionsController };
