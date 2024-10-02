import * as Yup from 'yup';

import { CreateRequestsCreditService } from './CreateRequestsCreditService';

class CreateRequestsCreditController {
  constructor(createRequestsCreditService = new CreateRequestsCreditService()) {
    this.createRequestsCreditService = createRequestsCreditService;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, next) {
    try {
      const { body, userId, roleId } = req;
      const params = { ...body, userId, roleId };

      const schema = Yup.object().shape({
        value: Yup.number().required('Você deve informar o valor.'),
        userId: Yup.string()
          .required('O userId é obrigatório.')
          .uuid('O userId informado está inválido'),
      });

      const isValid = schema.isValidSync(params);
      if (!isValid) {
        const validade = schema.validateSync(params);
        return res.status(400).json({ message: validade });
      }

      const request = await this.createRequestsCreditService.execute(params);

      return res.status(201).json(request);
    } catch (error) {
      return next(error);
    }
  }
}
export { CreateRequestsCreditController };
