import * as Yup from 'yup';

import { CreateTransactionsService } from './CreateTransactionsService';

class CreateTransactionsController {
  constructor(createTransactionService = new CreateTransactionsService()) {
    this.createTransactionService = createTransactionService;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, next) {
    try {
      const { body, userId } = req;
      const params = { ...body, userId };

      const schema = Yup.object().shape({
        userId: Yup.string()
          .required('O userId é  obrigatório!!')
          .uuid('O userId informado está inválido.'),
        type: Yup.string().oneOf(
          ['INCOME', 'EXPENSE'],
          'O tipo informado é inválido',
        ),
        value: Yup.number().required('Você deve informar o valor.'),
        description: Yup.string().required(
          'A transação precisa de uma descrição.',
        ),
      });

      const isValid = schema.isValidSync(params);
      if (!isValid) {
        const validate = schema.validateSync(params);
        return res.status(400).json({ message: validate });
      }

      const transaction = await this.createTransactionService.execute(params);

      return res.status(201).json(transaction);
    } catch (error) {
      return next(error);
    }
  }
}

export { CreateTransactionsController };
