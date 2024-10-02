import { changeRequestsFactory } from '@modules/credit-requests/useCases/admin/ChangeRequests/ChageRequestsFactory';
import { createRequestCreditFactory } from '@modules/credit-requests/useCases/users/CreateRequests/CreateRequestsCreditFactory';
import { getRequestsFactory } from '@modules/credit-requests/useCases/users/GetRequests/GetRequestsFactory';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { permissions } from '@shared/infra/http/middlewares/permissions';
import { Router } from 'express';

const creditRequestsRouter = Router();

/**
 * @swagger
 * /credit-requests:
 *   post:
 *     summary: Create Request
 *     tags: [credit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               value:
 *                 type: integer
 *               type:
 *                 type: string
 *             required:
 *               - userId
 *               - value
 *               - type
 *     responses:
 *       201:
 *         description: Successful create Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 value:
 *                   type: integer
 *                 type:
 *                   type: string
 */
creditRequestsRouter.post(
  '/',
  ensureAuthenticated,
  createRequestCreditFactory().handle,
);

/**
 * @swagger
 * /credit-requests:
 *   get:
 *     summary: Return list credit
 *     tags: [credit]
 *     parameters:
 *        - in: header
 *          name: Authorization
 *          required: true
 *          schema:
 *            type: string
 *          description: Your Bearer token
 *     responses:
 *       200:
 *         description: Successful return list credit
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: string
 *                   value:
 *                     type: string
 *                   status:
 *                     type: string
 *                   type:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 */
creditRequestsRouter.get('/', ensureAuthenticated, getRequestsFactory().handle);

/**
 * @swagger
 * /credit-requests:
 *   put:
 *     summary: Update credit-request
 *     tags: [credit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requestId:
 *                 type: string
 *               status:
 *                 type: integer
 *             required:
 *               - requestId
 *               - status
 *     responses:
 *       200:
 *         description: Successful update Credit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 user_id:
 *                   type: string
 *                 status:
 *                   type: string
 *                 value:
 *                   type: integer
 *                 type:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                 updated_at:
 *                   type: string
 */
creditRequestsRouter.put(
  '/',
  ensureAuthenticated,
  permissions([1]),
  changeRequestsFactory().handle,
);

export { creditRequestsRouter };
