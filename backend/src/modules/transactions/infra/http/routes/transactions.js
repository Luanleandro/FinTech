import { changeTransationFactory } from '@modules/transactions/useCases/users/ChangeTransactions/ChangeTransactionsFactory';
import { createTransactionsFactory } from '@modules/transactions/useCases/users/CreateTransactions/CreateTransactionsFactory';
import { deleteTransactionsFactory } from '@modules/transactions/useCases/users/DeleteTransactions/DeleteTransactionsFactory';
import { getTransactionsFactory } from '@modules/transactions/useCases/users/GetTransactions/GetTransactionsFactory';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

const transactionsRouter = Router();

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create Transaction
 *     tags: [transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *               value:
 *                 type: integer
 *               type:
 *                 type: string
 *             required:
 *               - uid
 *               - value
 *               - type
 *     responses:
 *       201:
 *         description: Successful create Transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 *                 value:
 *                   type: integer
 *                 type:
 *                   type: string
 */
transactionsRouter.post(
  '/',
  ensureAuthenticated,
  createTransactionsFactory().handle,
);

/**
 * @swagger
 * /transactions:
 *   put:
 *     summary: Update Transaction
 *     tags: [transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               transactionId:
 *                 type: string
 *               value:
 *                 type: integer
 *               type:
 *                 type: string
 *             required:
 *               - transactionId
 *               - value
 *               - type
 *     responses:
 *       200:
 *         description: Successful update Transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 user_id:
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
transactionsRouter.put(
  '/',
  ensureAuthenticated,
  changeTransationFactory().handle,
);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary:  return list transactions
 *     tags: [transactions]
 *     parameters:
 *        - in: header
 *          name: Authorization
 *          required: true
 *          schema:
 *            type: string
 *          description: Your Bearer token
 *     responses:
 *       200:
 *         description: Successful list transactions
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
 *                   type:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 */
transactionsRouter.get(
  '/',
  ensureAuthenticated,
  getTransactionsFactory().handle,
);

/**
 * @swagger
 * /transactions:
 *   delete:
 *     summary: Delete Transaction
 *     tags: [transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               transactionId:
 *                 type: integer
 *             required:
 *               - transactionId
 *     responses:
 *       200:
 *         description: Successful deleted Transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: string
 *                 value:
 *                   type: string
 *                 type:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                 updated_at:
 *                   type: string
 */
transactionsRouter.delete(
  '/',
  ensureAuthenticated,
  deleteTransactionsFactory().handle,
);

export { transactionsRouter };
