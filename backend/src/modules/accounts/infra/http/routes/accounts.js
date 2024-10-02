import { createUserFactory } from '@modules/accounts/useCases/admin/CreateUser/CreateUserFactory';
import { authenticatedUserFactory } from '@modules/accounts/useCases/users/AuthenticatedUsers/AuthenticatedUserFactory';
import { changeUserFactory } from '@modules/accounts/useCases/users/ChangeUser/ChangeUserFactory';
import { getDataUserFactory } from '@modules/accounts/useCases/users/GetDataUser/GetDataUserFactory';
import { resendEmailUserFactory } from '@modules/accounts/useCases/users/ResendEmail/ResendEmailUserFactory';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { permissions } from '@shared/infra/http/middlewares/permissions';
import { Router } from 'express';

const accountRouter = Router();

/**
 * @swagger
 * paths:
 *   /accounts/user/auth:
 *     post:
 *       summary: Authenticate users
 *       tags:
 *         - accounts
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *               required:
 *                 - email
 *                 - password
 *       responses:
 *         201:
 *           description: Successful authentication
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
accountRouter.post('/users/auth', authenticatedUserFactory().handle);

/**
 * @swagger
 * /accounts/admin/invite:
 *   post:
 *     summary: Create user
 *     tags: [accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               role_id:
 *                 type: integer
 *             required:
 *               - email
 *               - role_id
 *     responses:
 *       201:
 *         description: Successful create user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
accountRouter.post(
  '/admin/invite',
  ensureAuthenticated,
  permissions([1]),
  createUserFactory().handle,
);

/**
 * @swagger
 * /accounts/users:
 *   get:
 *     summary:  return data user
 *     tags: [accounts]
 *     parameters:
 *        - in: header
 *          name: Authorization
 *          required: true
 *          schema:
 *            type: string
 *          description: Your Bearer token
 *     responses:
 *       200:
 *         description: Successful data user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                    type: string
 *                 name:
 *                    type: string
 *                 email:
 *                    type: string
 *                 status:
 *                    type: boolean
 */
accountRouter.get('/users', ensureAuthenticated, getDataUserFactory().handle);

/**
 * @swagger
 * /accounts/invite:
 *   put:
 *     summary: Change user
 *     tags: [accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - userId
 *               - name
 *               - password
 *     responses:
 *       201:
 *         description: Successful update user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 */
accountRouter.put('/invite', ensureAuthenticated, changeUserFactory().handle);

/**
 * @swagger
 * /accounts/admin/resend-invite:
 *   post:
 *     summary: Re-send invite user
 *     tags: [accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Successful re-send invite user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 */
accountRouter.post(
  '/admin/resend-invite',
  ensureAuthenticated,
  permissions([1]),
  resendEmailUserFactory().handle,
);

export { accountRouter };
