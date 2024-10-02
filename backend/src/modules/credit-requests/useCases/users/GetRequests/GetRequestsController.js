import * as Yup from 'yup';

import { GetRequestsService } from './GetRequestsService';

class GetRequestsController {
  constructor(getRequestsService = new GetRequestsService()) {
    this.getRequestsService = getRequestsService;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, next) {
    try {
      const { body, userId, roleId } = req;
      const params = { ...body, userId, roleId };

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

      const creditRequests = await this.getRequestsService.execute(params);

      return res.json(creditRequests);
    } catch (error) {
      return next(error);
    }
  }
}

export { GetRequestsController };
