import * as Yup from 'yup';

import { ChangeRequestsService } from './ChangeRequestsService';

class ChangeRequestsController {
  constructor(changeRequestsService = new ChangeRequestsService()) {
    this.changeRequestsService = changeRequestsService;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, next) {
    try {
      const params = req.body;

      const schema = Yup.object().shape({
        requestId: Yup.number('O Id informado está inválido').required(
          'O id da transação é obrigatório!!',
        ),
        status: Yup.string()
          .oneOf(
            ['ACCEPT', 'REJECT'],
            'O status  da transação deve ser ACCEPT ou REJECT',
          )
          .required('O status da transação deve ser informado'),
      });

      const isValid = schema.isValidSync(params);
      if (!isValid) {
        const valide = schema.validateSync(params);
        return res.status(400).json({ message: valide });
      }

      const requestUpdate = await this.changeRequestsService.execute(params);

      return res.json(requestUpdate);
    } catch (error) {
      return next(error);
    }
  }
}

export { ChangeRequestsController };
