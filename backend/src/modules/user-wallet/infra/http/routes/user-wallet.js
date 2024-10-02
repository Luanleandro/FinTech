import { getUserWalletFactory } from '@modules/user-wallet/useCases/users/GetUserWallet/GetUserWalletByIdFactory';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

const userWalletRouter = Router();

/**
 * @swagger
 * /user-wallet:
 *   get:
 *     summary:  return data user wallet
 *     tags: [user-wallet]
 *     parameters:
 *        - in: header
 *          name: Authorization
 *          required: true
 *          schema:
 *            type: string
 *          description: Your Bearer token
 *     responses:
 *       200:
 *         description: Successful data user wallet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                    type: integer
 *                 uid:
 *                    type: string
 *                 user_id:
 *                    type: string
 *                 balance:
 *                    type: integer
 *                 created_at:
 *                    type: date
 *                 updated_at:
 *                    type: date
 */
userWalletRouter.get('/', ensureAuthenticated, getUserWalletFactory().handle);

export { userWalletRouter };
